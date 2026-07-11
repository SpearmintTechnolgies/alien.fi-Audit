"use client";

import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, ShieldAlert, Sparkles, Zap, TrendingUp, Cpu, FileText, BarChart3, CheckCircle2, Clock, Network, BrainCircuit, Lock, Mail, Calendar, Phone, Mail as MailIcon, MessageSquare, ChevronDown, ChevronUp, Menu, X, Search, DollarSign, Activity, Layers, Target, Zap as ZapIcon, Lightbulb, BookOpen, Users, Globe, Lock as LockIcon, Unlock, CheckCircle, AlertTriangle, Info, HelpCircle, ChevronRight, Filter, Download, Share2, Settings, MoreHorizontal, Plus, Minus, Trash2, Edit, Copy, Save, Upload, RefreshCw, Play, Pause, SkipForward, SkipBack, Rewind, FastForward, Volume2, VolumeX, Maximize2, Minimize2, Maximize, Minimize } from "lucide-react";
import { Header } from "@/components/Header";
import { RollingText } from "@/components/RollingText";
import { AnimatedLink } from "@/components/AnimatedLink";
import { BrandLogo } from "@/components/BrandLogo";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import * as motion from "framer-motion/client";
import { slideUp, staggerContainer, fadeIn } from "@/shared/components/animations";
import { ContactBar } from "@/shared/components/ContactBar";
import { Footer } from "@/shared/components/Footer";
import { useState } from "react";

// ── FAQ Accordion Item ───────────────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How long does the audit take?",
    answer: "Each audit takes approximately 3 minutes to complete. You'll receive instant RAG scorecards and actionable recommendations upon submission."
  },
  {
    question: "What do I need to prepare?",
    answer: "For the Cost Audit, have your AI tool access details and monthly spend handy. For the Opportunity Audit, be ready to describe your manual workflows and pain points."
  },
  {
    question: "What is a RAG score?",
    answer: "RAG stands for Red-Amber-Green. It's a simple scoring system: Red means action needed, Amber means room to improve, Green means you're doing well."
  },
  {
    question: "Who is this for?",
    answer: "This is for teams and organizations using AI tools who want to optimize costs, find automation opportunities, and build effective AI roadmaps."
  },
  {
    question: "Can I run both audits?",
    answer: "Absolutely! Many organizations run both audits to get a complete picture of their AI optimization and opportunity landscape."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All audit responses are processed securely. We never share your raw data, and you can download your full report at any time."
  }
];

// ── FAQ Accordion Component ──────────────────────────────────────────────────
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10">
      <motion.div 
        variants={slideUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-mono text-[#15182B] mb-4 uppercase tracking-tighter">
          FAQ
        </h2>
        <p className="text-[#15182B]/60 text-sm font-sans max-w-lg mx-auto">
          Everything you need to know about our AI Assessment Suite
        </p>
      </motion.div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#15182B]/5 transition-colors"
            >
              <span className="text-sm font-semibold font-mono text-[#15182B]">{item.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-[#15182B]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#15182B]" />
              )}
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIndex === idx ? "auto" : 0, opacity: openIndex === idx ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 text-sm text-[#15182B]/70 font-sans leading-relaxed border-t border-[#15182B]/10 pt-4">
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Results Preview Section ──────────────────────────────────────────────────
function ResultsPreview() {
  return (
    <section className="bg-gradient-to-b from-[#15182B] to-[#0a0c16] border-y border-[#96EE52]/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#96EE52 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Score Panel */}
          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 uppercase tracking-tighter">
                RAG Scorecard
              </h2>
              <p className="text-white/60 text-sm font-sans max-w-md">
                Get instant visual feedback on your AI stack health with our comprehensive scoring system designed for enterprise precision.
              </p>
            </div>

            {/* Score Panel Mockup */}
            <div className="bg-[#15182B] rounded-[24px] border border-[#96EE52]/30 p-8 shadow-[0_18px_56px_rgba(150,238,82,0.05)]">
              <div className="flex items-center justify-between mb-8 border-b border-[#96EE52]/20 pb-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Cost Architecture</h3>
                <span className="text-[10px] font-bold bg-[#96EE52]/10 text-[#96EE52] border border-[#96EE52]/30 px-3 py-1 rounded-md font-mono">
                  LIVE ANALYSIS
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[                  { label: "EFFICIENCY", score: "AMBER", value: 68, color: "bg-amber-500" },
                  { label: "MODEL FIT", score: "RED", value: 42, color: "bg-rose-500" },
                  { label: "ARCHITECTURE", score: "GREEN", value: 85, color: "bg-[#96EE52]" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-semibold font-mono text-white/50">{item.label}</span>
                      <span className={`text-[10px] font-bold uppercase font-mono ${item.score === "GREEN" ? "text-[#96EE52]" : item.score === "AMBER" ? "text-amber-500" : "text-rose-500"}`}>
                        {item.score}
                      </span>
                    </div>
                    <div className="h-32 bg-white/5 rounded-md overflow-hidden relative border border-white/10">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`absolute bottom-0 w-full ${item.color}`}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono text-white/70">{item.value}/100</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <div className="w-8 h-8 rounded-md bg-rose-500/20 flex items-center justify-center flex-shrink-0 border border-rose-500/30">
                    <span className="text-xs font-bold text-rose-500 font-mono">!</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-500 font-mono uppercase tracking-wide">Critical: Model Overuse</p>
                    <p className="text-xs text-white/60 mt-1 font-sans">Premium models being used for tasks that don't require them</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#96EE52]/10 border border-[#96EE52]/20">
                  <div className="w-8 h-8 rounded-md bg-[#96EE52]/20 flex items-center justify-center flex-shrink-0 border border-[#96EE52]/30">
                    <CheckCircle2 className="w-4 h-4 text-[#96EE52]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#96EE52] font-mono uppercase tracking-wide">Good: Active Monitoring</p>
                    <p className="text-xs text-white/60 mt-1 font-sans">Usage tracking is properly configured across all tools</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Recommendation Cards */}
          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 uppercase tracking-tighter">
                Priorities
              </h2>
              <p className="text-white/60 text-sm font-sans max-w-md">
                Get specific, prioritized recommendations to optimize your AI operations.
              </p>
            </div>

            {/* Recommendation Cards */}
            <div className="space-y-4">
              {[                { 
                  title: "Right-Size Model Selection", 
                  tags: ["COST", "HIGH IMPACT"],
                  desc: "Downgrade from GPT-4 to GPT-3.5 for simple classification tasks"
                },
                { 
                  title: "Implement Caching Layer", 
                  tags: ["EFFICIENCY", "MEDIUM IMPACT"],
                  desc: "Add response caching for repeated queries to reduce token usage"
                },
                { 
                  title: "Consolidate Duplicate Tools", 
                  tags: ["COST", "HIGH IMPACT"],
                  desc: "Evaluate overlapping AI tools and consolidate to reduce spend"
                }
              ].map((rec, idx) => (
                <motion.div
                  key={idx}
                  variants={slideUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#15182B] rounded-xl border border-white/10 p-5 hover:border-[#96EE52]/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold font-mono text-white mb-2 uppercase tracking-wide">{rec.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed font-sans">{rec.desc}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {rec.tags.map((tag: string, tagIdx: number) => (
                        <span 
                          key={tagIdx} 
                          className={`text-[9px] font-bold uppercase font-mono px-2 py-1 rounded-sm border ${tag === "COST" ? "bg-rose-500/10 text-rose-500 border-rose-500/30" : tag === "EFFICIENCY" ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-[#96EE52]/10 text-[#96EE52] border-[#96EE52]/30"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section ─────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-[#15182B] mb-4 uppercase tracking-tighter">
            THE PROCESS
          </h2>
          <p className="text-[#15182B]/60 text-sm font-sans max-w-lg mx-auto">
            A precise, three-step engagement designed to generate business value instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#15182B]/10 -translate-y-1/2 -z-10" />
          
          {[            {
              step: "01",
              title: "SELECT AUDIT",
              desc: "Choose between Cost Audit or Opportunity Audit based on your immediate operational needs."
            },
            {
              step: "02",
              title: "PROVIDE DATA",
              desc: "Complete our secure, guided diagnostic. 15-20 targeted data points in under 3 minutes."
            },
            {
              step: "03",
              title: "EXTRACT INSIGHTS",
              desc: "Receive instant RAG scores, tailored recommendations, and an automated PDF roadmap."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={slideUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="glass-card p-8 text-center hover:border-[#15182B] transition-colors h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#15182B] flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold font-mono text-[#96EE52]">{item.step}</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-[#15182B] mb-3 uppercase">{item.title}</h3>
                <p className="text-xs text-[#15182B]/60 font-sans leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Value Section ────────────────────────────────────────────────────────────
function ValueSection() {
  return (
    <section className="bg-white py-20 md:py-32 relative z-10 border-y border-[#15182B]/10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-[10px] font-bold font-mono text-[#96EE52] uppercase tracking-[0.2em] mb-4">Value Proposition</div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-[#15182B] mb-4 uppercase tracking-tighter">
            WHAT SETS US APART
          </h2>
          <p className="text-[#15182B]/60 text-sm font-sans max-w-lg mx-auto">
            Many AI consulting firms talk about transformation. We deliver AI diagnostics that generate measurable operational improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[            {
              icon: <Zap className="w-8 h-8 text-[#15182B]" />,
              title: "REDUCE WASTE",
              desc: "Identify and eliminate AI spending leaks across redundant models and inefficient prompts before they drain your budget."
            },
            {
              icon: <Lightbulb className="w-8 h-8 text-[#15182B]" />,
              title: "FIND OPPORTUNITIES",
              desc: "Discover automation opportunities mapped directly to your manual processes with clear feasibility scores."
            },
            {
              icon: <Target className="w-8 h-8 text-[#15182B]" />,
              title: "BUILD ROADMAP",
              desc: "Get a phased, production-ready implementation plan with prioritized actions and ROI estimates."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={slideUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-transparent border border-[#15182B]/10 rounded-2xl p-8 hover:bg-[#15182B]/5 transition-colors"
            >
              <div className="mb-6 opacity-80">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold font-mono text-[#15182B] mb-3 uppercase tracking-wide">{item.title}</h3>
              <p className="text-xs text-[#15182B]/60 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Audit Cards Section ──────────────────────────────────────────────────────
function AuditCards() {
  return (
    <section className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cost Audit Card */}
          <motion.a
            variants={slideUp}
            href="/ai/cost-scan"
            className="group block glass-card p-10 hover:bg-white transition-all duration-300 relative overflow-hidden text-left"
          >
            <div className="w-16 h-16 rounded-xl bg-[#15182B] flex items-center justify-center mb-8 shadow-lg">
              <ShieldAlert className="w-8 h-8 text-[#96EE52]" />
            </div>
            <h2 className="text-3xl font-bold font-mono text-[#15182B] mb-4 uppercase tracking-tighter">
              AI COST AUDIT
            </h2>
            <p className="text-[#15182B]/70 text-sm font-sans leading-relaxed mb-8">
              Is your AI stack burning budget? Find cost leakages, track unit economics anomalies, and identify premium model mismatches with our enterprise diagnostic.
            </p>

            <ul className="space-y-4 text-xs font-semibold font-sans text-[#15182B]/60 mb-10">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Finds AI spending leaks</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Scores cost architecture risks</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Tailored optimization suggestions</span>
              </li>
            </ul>

            <MagneticWrapper>
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold bg-[#96EE52] text-[#15182B] group-hover:-translate-y-1 transition-all duration-300 w-full whitespace-nowrap shadow-[0_4px_14px_rgba(150,238,82,0.4)]">
                <RollingText text="INITIALIZE COST AUDIT" />
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticWrapper>
          </motion.a>

          {/* Opportunity Audit Card */}
          <motion.a
            variants={slideUp}
            href="/ai/opportunity-scan"
            className="group block glass-card p-10 hover:bg-white transition-all duration-300 relative overflow-hidden text-left border-[#15182B]"
          >
            <div className="w-16 h-16 rounded-xl bg-transparent border-2 border-[#15182B] flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-[#15182B]" />
            </div>
            <h2 className="text-3xl font-bold font-mono text-[#15182B] mb-4 uppercase tracking-tighter">
              AI OPPORTUNITY
            </h2>
            <p className="text-[#15182B]/70 text-sm font-sans leading-relaxed mb-8">
              Where can AI automate workflows? Detect manual bottlenecks, calculate feasibility, and draw a phased implementation roadmap for your business.
            </p>

            <ul className="space-y-4 text-xs font-semibold font-sans text-[#15182B]/60 mb-10">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Finds where AI can be applied</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Scores readiness & business value</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15182B]"></span>
                <span>Creates phased adoption roadmap</span>
              </li>
            </ul>

            <MagneticWrapper>
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold bg-transparent border border-[#15182B]/20 text-[#15182B] group-hover:bg-[#15182B]/5 group-hover:-translate-y-1 transition-all duration-300 w-full whitespace-nowrap">
                <RollingText text="IDENTIFY OPPORTUNITIES" />
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticWrapper>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-[#15182B]/10">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <MagneticWrapper>
              <motion.div 
                variants={slideUp}
                className="group inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-[#15182B]/20 bg-white/50 text-[#15182B] text-xs font-bold font-mono uppercase tracking-widest cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-[#96EE52] animate-pulse shadow-[0_0_8px_#96EE52]" />
                <RollingText text="Alien AI Diagnostic Suite" />
              </motion.div>
            </MagneticWrapper>

            <motion.h1 
              variants={slideUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-[#15182B] leading-[1.05] tracking-tighter uppercase"
            >
              WE BUILD <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#15182B] via-[#96EE52] to-[#15182B] animate-shimmer bg-[length:200%_auto]">AI THAT WORKS.</span>
            </motion.h1>

            <motion.p 
              variants={slideUp}
              className="text-base md:text-lg text-[#15182B]/70 font-sans max-w-xl leading-relaxed"
            >
              Select one of our 3-minute diagnostic scans below to assess your current systems, calculate RAG scorecards, and generate actionable technical recommendations.
            </motion.p>

            <motion.div 
              variants={slideUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <AnimatedLink
                href="#audit-cards"
                text="START FREE AUDIT"
                icon={<ArrowRight className="w-4 h-4" />}
                variant="primary"
                className="w-full sm:w-auto justify-center"
              />
            </motion.div>

            <motion.div 
              variants={slideUp}
              className="pt-8 border-t border-[#15182B]/10 flex gap-12"
            >
               <div>
                 <div className="font-mono font-bold text-3xl text-[#15182B]">100+</div>
                 <div className="font-sans text-[10px] uppercase text-[#15182B]/50 mt-1 font-semibold">Audits Completed</div>
               </div>
               <div>
                 <div className="font-mono font-bold text-3xl text-[#15182B]">0.0x</div>
                 <div className="font-sans text-[10px] uppercase text-[#15182B]/50 mt-1 font-semibold">Avg ROI Tracking</div>
               </div>
            </motion.div>
          </motion.div>

          {/* Right: Technical Diagram Mockup */}
          <motion.div 
            variants={slideUp}
            initial="hidden"
            animate="show"
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-card p-2">
               <div className="bg-[#15182B] rounded-[20px] w-full h-[500px] overflow-hidden relative border border-[#96EE52]/20 shadow-2xl">
                 <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(150, 238, 82, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(150, 238, 82, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 
                 <div className="absolute top-8 left-8 right-8 flex justify-between items-center border-b border-white/10 pb-4">
                   <div className="font-mono text-xs text-[#96EE52] tracking-widest">SYSTEM_DIAGNOSTIC</div>
                   <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-white/20"></div>
                     <div className="w-2 h-2 rounded-full bg-white/20"></div>
                     <div className="w-2 h-2 rounded-full bg-[#96EE52]"></div>
                   </div>
                 </div>

                 <div className="absolute top-24 left-8 right-8 space-y-6">
                   <div className="h-16 bg-white/5 rounded-lg border border-white/10 flex items-center px-6 gap-4">
                     <div className="w-8 h-8 rounded bg-[#96EE52]/20 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-[#96EE52]" />
                     </div>
                     <div className="flex-1">
                       <div className="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
                       <div className="h-1 w-48 bg-white/10 rounded-full"></div>
                     </div>
                     <div className="font-mono text-xs text-[#96EE52]">OK</div>
                   </div>
                   
                   <div className="h-16 bg-white/5 rounded-lg border border-rose-500/30 flex items-center px-6 gap-4 relative overflow-hidden">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                     <div className="w-8 h-8 rounded bg-rose-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                     </div>
                     <div className="flex-1">
                       <div className="h-2 w-32 bg-rose-500/50 rounded-full mb-2"></div>
                       <div className="h-1 w-40 bg-white/10 rounded-full"></div>
                     </div>
                     <div className="font-mono text-xs text-rose-500">ERR</div>
                   </div>

                   <div className="h-16 bg-white/5 rounded-lg border border-white/10 flex items-center px-6 gap-4">
                     <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-white/50" />
                     </div>
                     <div className="flex-1">
                       <div className="h-2 w-20 bg-white/20 rounded-full mb-2"></div>
                       <div className="h-1 w-32 bg-white/10 rounded-full"></div>
                     </div>
                     <div className="font-mono text-xs text-white/30">IDLE</div>
                   </div>
                 </div>

                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#15182B] to-transparent pointer-events-none"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// ── Final CTA Section ────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-[#15182B] py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#96EE52 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-[10px] font-bold font-mono text-[#96EE52] uppercase tracking-[0.2em]">Partner with us</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-white tracking-tighter uppercase leading-tight">
            BUILD NEXT-GENERATION AI INFRASTRUCTURE.
          </h2>
          <p className="text-white/50 text-sm font-sans max-w-2xl mx-auto">
            Get instant insights into your AI operations and discover massive automation opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <a
              href="/ai/cost-scan"
              className="px-8 py-4 bg-[#96EE52] text-[#15182B] rounded-lg font-mono font-bold hover:bg-white transition-colors"
            >
              RUN COST AUDIT
            </a>
            <AnimatedLink
              href="/ai/opportunity-scan"
              text="Identify Opportunities"
              variant="outline"
              className="w-full justify-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      <div id="audit-cards">
        {/* Audit Cards */}
        <AuditCards />
      </div>

      {/* Value Section */}
      <ValueSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Results Preview */}
      <ResultsPreview />

      {/* FAQ */}
      <FAQAccordion />

      {/* Final CTA */}
      <FinalCTA />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}