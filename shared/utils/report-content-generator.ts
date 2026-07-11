import scoreDescriptions from "../config/score-descriptions.json";

interface ReportItem {
  type: 'paragraph' | 'list' | 'image' | 'code';
  content: string;
}

interface ReportSection {
  id: string;
  title: string;
  subtext?: string;
  items: ReportItem[];
}

export interface ReportData {
  title: string;
  timestamp: string;
  metadata: { [key: string]: string };
  sections: ReportSection[];

  submissionId?: string;
  reportType?: "cost" | "opportunity";
  scorecard?: {
    dimensions: Array<{
      label: string;
      value: "red" | "amber" | "green" | "unknown";
      bgColor: string;
      textColor: string;
      borderColor: string;
      dotColor: string;
      labelColor: string;
    }>;
  };
  tier?: 1 | 2 | 3 | 4;
  confidenceScore?: string;
  logoBase64?: string;
}

// ── Alien Brand Colors ────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: { bg: "#15182B", border: "#15182B", text: "#ffffff" },
  accent:  { bg: "#96EE52", border: "#96EE52", text: "#15182B" },
  surface: { bg: "#EEF4FF", border: "#C7C8D3", text: "#15182B" },
};

export const RAG_COLORS = {
  red:   { bg: "#FEE2E2", text: "#B91C1C", border: "#FCA5A5", dot: "#B91C1C", label: "HIGH RISK" },
  amber: { bg: "#FEF3C7", text: "#B45309", border: "#FCD34D", dot: "#B45309", label: "NEEDS ATTENTION" },
  green: { bg: "#DCFCE7", text: "#15803D", border: "#86EFAC", dot: "#15803D", label: "LOW RISK" },
};

export function getColorConfig(value: "red" | "amber" | "green" | "unknown") {
  const config = RAG_COLORS[value as keyof typeof RAG_COLORS];
  if (!config) return { bgColor: "#F8FAFC", textColor: "#64748B", borderColor: "#E2E8F0", dotColor: "#94A3B8", labelColor: "UNKNOWN" };
  return {
    bgColor: config.bg,
    textColor: config.text,
    borderColor: config.border,
    dotColor: config.dot,
    labelColor: config.label,
  };
}

// ── RAG helpers ───────────────────────────────────────────────────────────────
const ragColor  = (v: string) => v === "red" ? "#B91C1C" : v === "amber" ? "#B45309" : v === "green" ? "#15803D" : "#64748B";
const ragBg     = (v: string) => v === "red" ? "#FEE2E2" : v === "amber" ? "#FEF3C7" : v === "green" ? "#DCFCE7" : "#F8FAFC";
const ragBorder = (v: string) => v === "red" ? "#FCA5A5" : v === "amber" ? "#FCD34D" : v === "green" ? "#86EFAC" : "#E2E8F0";
const ragLabel  = (v: string) => v === "red" ? "HIGH RISK" : v === "amber" ? "NEEDS ATTENTION" : v === "green" ? "LOW RISK" : "UNKNOWN";

// ── Strip leading hyphens from titles ─────────────────────────────────────────
export function stripLeadingHyphens(text: string): string {
  return text.replace(/^-+\s*/, '');
}

// ── Markdown → HTML converter ─────────────────────────────────────────────────
export function mdToHtml(markdown: string, options: { pdfMode?: boolean; emailMode?: boolean } = {}): string {
  if (!markdown) return "";
  const { pdfMode = false } = options;

  const lines = markdown.split(/\r?\n/);
  const result: string[] = [];
  let inList = false;

  const closeList = () => { if (inList) { result.push("</ul>"); inList = false; } };

  const applyInline = (line: string) => {
    line = line.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    line = line.replace(/__(.*?)__/g, '<strong>$1</strong>');
    line = line.replace(/_(.*?)_/g, '<em>$1</em>');
    line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
    if (options.emailMode) {
      line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    } else {
      line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }
    return line;
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (/^### (.+)/.test(trimmed)) {
      closeList();
      const text = applyInline(trimmed.replace(/^### /, ""));
      result.push(`<h3>${text}</h3>`);
    } else if (/^## (.+)/.test(trimmed)) {
      closeList();
      const text = applyInline(trimmed.replace(/^## /, ""));
      result.push(`<h2>${text}</h2>`);
    } else if (/^# (.+)/.test(trimmed)) {
      closeList();
      const text = applyInline(trimmed.replace(/^# /, ""));
      result.push(`<h1>${text}</h1>`);
    } else if (/^[-*+] (.+)/.test(trimmed)) {
      const content = applyInline(trimmed.replace(/^[-*+] /, "").trim());
      if (!inList) {
        result.push('<ul class="custom-list">');
        inList = true;
      }
      result.push(`<li>${content}</li>`);
    } else if (/^\d+\.\s/.test(trimmed)) {
      const content = applyInline(trimmed.replace(/^\d+\.\s/, "").trim());
      if (!inList) {
        result.push('<ul class="custom-list">');
        inList = true;
      }
      const num = trimmed.match(/^(\d+)\./)?.[1] ?? "1";
      result.push(`<li><span class="num">${num}.</span>${content}</li>`);
    } else if (/^> (.+)/.test(trimmed)) {
      closeList();
      const content = applyInline(trimmed.replace(/^> /, "").trim());
      result.push(`<blockquote>${content}</blockquote>`);
    } else if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      closeList();
      result.push('<hr>');
    } else if (trimmed === "") {
      closeList();
      result.push('<div class="spacer"></div>');
    } else {
      closeList();
      const content = applyInline(trimmed);
      result.push(`<p>${content}</p>`);
    }
  }

  closeList();
  return result.join("\n");
}

// ── Scorecard HTML ───────────────────────────────────────────────────────────
function renderScorecardHtml(
  dimensions: NonNullable<ReportData["scorecard"]>["dimensions"],
  mode: "email" | "pdf" | "web",
  reportType: string
): string {
  const isCost = reportType === "cost";
  const labelMap: Record<string, string> = isCost
    ? { 0: "Spend Risk", 1: "Architecture Risk", 2: "Pain Risk" }
    : { 0: "Readiness Risk", 1: "Value Risk", 2: "Opportunity Risk" };

  const dimensionKeys = isCost
    ? ["spend", "architecture", "pain"]
    : ["readiness", "value", "opportunity"];

  const cardsHtml = dimensions.map((dim, idx) => {
    const val = dim.value;
    const displayLabel = labelMap[idx] ?? dim.label;
    const dimKey = dimensionKeys[idx] || "spend";
    const dynamicDescription = (scoreDescriptions as Record<string, Record<string, string>>)[dimKey]?.[val] || "";

    const bg    = ragBg(val);
    const color = ragColor(val);
    const bord  = ragBorder(val);
    const statusText = ragLabel(val);

    const checkCircleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`;
    const alertTriangleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
    const statusIcon = val === "green" ? checkCircleSvg : alertTriangleSvg;

    return `
      <div class="scorecard-item" style="background:${bg}; border-color:${bord};">
        <div class="scorecard-header">
          <div class="scorecard-icon">${statusIcon}</div>
          <div class="scorecard-badge" style="color:${color}; border-color:${bord};">${statusText}</div>
        </div>
        <div class="scorecard-title">${displayLabel}</div>
        <div class="scorecard-desc">${dynamicDescription}</div>
      </div>
    `;
  }).join("");

  return `
  <div class="section-container avoid-break">
    <div class="section-title">RAG Scorecard Overview</div>
    <div class="scorecard-grid">
      ${cardsHtml}
    </div>
  </div>`;
}

// ── Main renderer ─────────────────────────────────────────────────────────────
export function renderReportToHtml(report: ReportData, options: { mode: "web" | "email" | "pdf"; locked?: boolean }): string {
  const reportString = JSON.stringify(report).replace(/[\u2013\u2014]/g, "-");
  report = JSON.parse(reportString);

  const { mode } = options;
  const isPdf = mode === "pdf";
  const host = process.env.NEXT_PUBLIC_APP_URL || "https://alien.fi";
  const viewReportLink = `${host}/ai/${report.reportType === "cost" ? "cost-scan" : "opportunity-scan"}/results?id=${report.submissionId}`;

  let bodyContent = "";

  // ── Cover Block
  bodyContent += `
  <div class="cover-block">
    <div class="cover-header">
      <div class="cover-logo">
        ${report.logoBase64
          ? `<img src="${report.logoBase64}" alt="Alien" />`
          : `<span style="color: #22c55e; font-weight: bold;">Alien.fi</span>`
        }
      </div>
      <div class="cover-type">
        ${report.reportType === "cost" ? "AI COST AUDIT" : "AI OPPORTUNITY AUDIT"}
      </div>
    </div>
    <div class="cover-content">
      <div class="doc-meta">REPORT ID: ${report.submissionId || "ALIEN-0001"} &nbsp;|&nbsp; DATE: ${report.timestamp}</div>
      <h1 class="doc-title">${stripLeadingHyphens(report.title)}</h1>
      <div class="doc-tags">
        ${Object.keys(report.metadata)
          .filter(key => !(isPdf && key === "Company"))
          .map(key => `<span><strong>${key}:</strong> ${report.metadata[key]}</span>`)
          .join('')}
      </div>
      ${mode === "email" ? `
        <a href="${viewReportLink}" class="btn-primary">View Interactive Dashboard</a>
      ` : ""}
    </div>
  </div>`;

  // ── Scorecard Section
  if (report.scorecard?.dimensions?.length) {
    bodyContent += renderScorecardHtml(report.scorecard.dimensions, mode, report.reportType ?? "cost");
  }

  // ── Section rendering helpers
  const sectionOrder = ["insights", "findings", "recommendations", "roadmap", "auditReport"];
  const sectionsMap = new Map<string, ReportSection>();
  report.sections.forEach(s => sectionsMap.set(s.id, s));

  let findingsHtml = "";
  let recsHtml = "";

  sectionOrder.forEach(sectionId => {
    const section = sectionsMap.get(sectionId);
    if (!section) return;

    if (sectionId === "insights") {
      const items = section.items.flatMap(item =>
        item.content.split("\n").map(l => l.replace(/^[-*+]\s*/, "").trim()).filter(Boolean)
      );
      bodyContent += `
      <div class="section-container avoid-break">
        <div class="section-title">Key Insights</div>
        <div class="insights-grid">
          ${items.map(text => `
            <div class="insight-item">
              <div class="insight-icon">✓</div>
              <p>${text}</p>
            </div>`
          ).join("")}
        </div>
      </div>`;

    } else if (sectionId === "findings") {
      const items = section.items.flatMap(item =>
        item.content.split("\n").map(l => l.replace(/^[-*+]\s*/, "").trim()).filter(Boolean)
      );
      findingsHtml = `
        <div class="split-col findings-col">
          <div class="split-header findings-header">Key Findings</div>
          <ul class="split-list">
            ${items.map(text => `<li><span>!</span><p>${text}</p></li>`).join("")}
          </ul>
        </div>`;

    } else if (sectionId === "recommendations") {
      const items = section.items.flatMap(item =>
        item.content.split("\n").map(l => l.replace(/^[-*+]\s*/, "").trim()).filter(Boolean)
      );
      recsHtml = `
        <div class="split-col recs-col">
          <div class="split-header recs-header">Expert Recommendations</div>
          <ul class="split-list">
            ${items.map(text => `<li><span>✓</span><p>${text}</p></li>`).join("")}
          </ul>
        </div>`;
    } else if (sectionId === "roadmap") {
      bodyContent += `
      <div class="section-container page-break-before">
        <div class="section-title">90-Day Implementation Roadmap</div>
        <div class="roadmap-container">
          ${section.items.map((item, idx) => {
            if (item.type === "paragraph") {
              return `<div class="roadmap-phase-title">${item.content}</div>`;
            }
            const listItems = item.content
              .split("\n")
              .map(l => l.replace(/^[-*+\d.]+\s*/, "").trim())
              .filter(Boolean);
            return `
            <div class="roadmap-phase avoid-break">
              <div class="roadmap-line"></div>
              <div class="roadmap-node"></div>
              <div class="roadmap-content">
                <div class="roadmap-step">Phase ${idx}</div>
                <ul class="roadmap-items">
                  ${listItems.map(text => `<li><span class="bullet">→</span> ${text}</li>`).join("")}
                </ul>
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>`;
    } else if (sectionId === "auditReport") {
      const rawContent = section.items[0]?.content ?? "";
      bodyContent += `
      <div class="section-container page-break-before">
        <div class="section-title">Detailed Technical Audit</div>
        <div class="markdown-content">
          ${rawContent.includes('<div') || rawContent.includes('<h1>') || rawContent.includes('<h3') 
            ? rawContent 
            : mdToHtml(rawContent, { pdfMode: isPdf, emailMode: false })}
        </div>
      </div>`;
    }
  });

  // ── Combined findings + recommendations block
  if (findingsHtml || recsHtml) {
    bodyContent += `
    <div class="section-container avoid-break">
      <div class="section-title">Analysis Summary</div>
      <div class="split-view">
        ${findingsHtml}
        ${recsHtml}
      </div>
    </div>`;
  }

  // ── CSS & HTML Construction
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>\${report.title} — Alien</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-navy: #15182B;
      --color-neon: #96EE52;
      --color-bg: #EEF4FF;
      --color-border: #C7C8D3;
      --font-sans: 'Poppins', sans-serif;
      --font-mono: 'Azeret Mono', monospace;
    }

    * { box-sizing: border-box; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-navy);
      -webkit-font-smoothing: antialiased;
    }

    .report-wrapper {
      max-width: 1000px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
    }

    /* Print Optimizations */
    @media print {
      @page {
        size: A4 portrait;
        margin: 20mm;
        @bottom-center {
          content: "CONFIDENTIAL | ALIEN AI AUDIT | PAGE " counter(page);
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          color: #15182B;
        }
      }
      body { background: #ffffff !important; }
      .report-wrapper { max-width: 100%; padding: 0; margin: 0; box-shadow: none; }
      .avoid-break { page-break-inside: avoid; }
      .page-break-before { page-break-before: always; }
      .cover-block { min-height: 250px; }
    }

    /* Cover Block */
    .cover-block {
      background: var(--color-navy);
      color: #ffffff;
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }
    .cover-block::after {
      content: "";
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      background-image: radial-gradient(var(--color-neon) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.1;
      pointer-events: none;
    }
    .cover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
      position: relative;
      z-index: 2;
    }
    .cover-logo img { height: 28px; }
    .cover-logo span { font-family: var(--font-mono); font-size: 24px; font-weight: 700; color: var(--color-neon); }
    .cover-type {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--color-neon);
      border: 1px solid rgba(150,238,82,0.3);
      padding: 4px 12px;
      border-radius: 4px;
      background: rgba(150,238,82,0.1);
    }
    .cover-content { position: relative; z-index: 2; }
    .doc-meta { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
    .doc-title { font-family: var(--font-mono); font-size: 32px; font-weight: 700; margin: 0 0 24px 0; text-transform: uppercase; line-height: 1.1; }
    .doc-tags { display: flex; flex-wrap: wrap; gap: 12px; }
    .doc-tags span { background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 12px; font-family: var(--font-mono); }
    .doc-tags strong { color: var(--color-neon); font-weight: 600; }
    .btn-primary { display: inline-block; margin-top: 24px; background: var(--color-neon); color: var(--color-navy); padding: 12px 24px; text-decoration: none; font-family: var(--font-mono); font-weight: 700; border-radius: 8px; font-size: 12px; }

    /* Sections */
    .section-container { margin-bottom: 40px; }
    .section-title { font-family: var(--font-mono); font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--color-navy); border-bottom: 2px solid var(--color-neon); padding-bottom: 8px; margin-bottom: 20px; }

    /* Scorecards */
    .scorecard-grid { display: flex; gap: 20px; }
    .scorecard-item { flex: 1; border: 1.5px solid; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; }
    .scorecard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .scorecard-badge { font-family: var(--font-mono); font-size: 10px; font-weight: 700; border: 1px solid; padding: 2px 8px; border-radius: 4px; }
    .scorecard-title { font-family: var(--font-mono); font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--color-navy); text-transform: uppercase; }
    .scorecard-desc { font-size: 11px; color: rgba(21, 24, 43, 0.7); line-height: 1.5; }

    /* Split View */
    .split-view { display: flex; gap: 24px; }
    .split-col { flex: 1; border: 1px solid; border-radius: 12px; padding: 20px; background: #ffffff; }
    .findings-col { border-color: #FCA5A5; background: #FEF2F2; }
    .recs-col { border-color: #86EFAC; background: #F0FDF4; }
    .split-header { font-family: var(--font-mono); font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
    .findings-header { color: #B91C1C; }
    .recs-header { color: #15803D; }
    .split-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .split-list li { display: flex; gap: 12px; align-items: flex-start; }
    .split-list li span { font-weight: 700; font-family: var(--font-mono); margin-top: 2px; }
    .findings-col li span { color: #B91C1C; }
    .recs-col li span { color: #15803D; }
    .split-list li p { margin: 0; font-size: 12px; line-height: 1.5; color: var(--color-navy); opacity: 0.8; }

    /* Insights */
    .insights-grid { display: flex; flex-direction: column; gap: 12px; }
    .insight-item { display: flex; gap: 16px; align-items: flex-start; background: #F8FAFC; border: 1px solid var(--color-border); padding: 16px; border-radius: 12px; }
    .insight-icon { color: var(--color-navy); font-weight: 700; font-family: var(--font-mono); }
    .insight-item p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--color-navy); opacity: 0.9; }

    /* Roadmap */
    .roadmap-container { padding-left: 12px; border-left: 2px dashed var(--color-border); margin-left: 12px; }
    .roadmap-phase-title { font-family: var(--font-mono); font-weight: 700; font-size: 14px; margin: 24px 0 16px -24px; background: #ffffff; display: inline-block; padding-right: 12px; color: var(--color-navy); }
    .roadmap-phase { position: relative; margin-bottom: 24px; }
    .roadmap-node { position: absolute; left: -19px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--color-neon); border: 2px solid var(--color-navy); }
    .roadmap-content { margin-left: 16px; }
    .roadmap-step { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-navy); opacity: 0.5; margin-bottom: 4px; text-transform: uppercase; }
    .roadmap-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .roadmap-items li { font-size: 12px; color: var(--color-navy); display: flex; align-items: flex-start; gap: 8px; }
    .roadmap-items .bullet { color: var(--color-neon); font-weight: bold; font-family: var(--font-mono); }

    /* Markdown content */
    .markdown-content h1 { font-family: var(--font-mono); font-size: 20px; margin: 32px 0 16px; text-transform: uppercase; }
    .markdown-content h2 { font-family: var(--font-mono); font-size: 16px; margin: 24px 0 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
    .markdown-content h3 { font-family: var(--font-mono); font-size: 12px; margin: 16px 0 8px; color: var(--color-navy); opacity: 0.7; text-transform: uppercase; }
    .markdown-content p { font-size: 12px; line-height: 1.6; margin-bottom: 12px; opacity: 0.8; }
    .markdown-content .custom-list { list-style: none; padding: 0; margin: 0 0 16px 0; }
    .markdown-content .custom-list li { position: relative; padding-left: 20px; font-size: 12px; line-height: 1.6; margin-bottom: 8px; opacity: 0.8; }
    .markdown-content .custom-list li::before { content: "•"; position: absolute; left: 0; color: var(--color-neon); font-weight: bold; }
    .markdown-content .custom-list li .num { position: absolute; left: 0; color: var(--color-neon); font-weight: bold; font-family: var(--font-mono); font-size: 10px; }
    .markdown-content code { background: var(--color-bg); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 10px; border: 1px solid var(--color-border); }
    .markdown-content strong { font-weight: 600; opacity: 1; }
    .markdown-content blockquote { margin: 16px 0; padding: 12px 16px; border-left: 4px solid var(--color-neon); background: var(--color-bg); font-style: italic; font-size: 12px; opacity: 0.8; }
  </style>
</head>
<body>
  <div class="report-wrapper">
    \${bodyContent}
  </div>
</body>
</html>`;
}
