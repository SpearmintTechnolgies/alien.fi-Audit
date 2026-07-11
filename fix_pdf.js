const fs = require('fs');

function fixFile(filePath, titleText) {
  let f = fs.readFileSync(filePath, 'utf8');
  
  // Replace opening div for architecture
  const target1 = '<div className="pt-8 border-t border-slate-200">';
  const repl1 = '<table style={{ width: \\'100%\\', pageBreakInside: \\'avoid\\', borderCollapse: \\'collapse\\', marginTop: \\'32px\\', borderTop: \\'1px solid #e2e8f0\\' }}>\\n        <tbody>\\n          <tr>\\n            <td style={{ padding: 0 }}>\\n              <div className="pt-8">';
  
  if (f.includes(target1)) {
    // Only replace the one right before the titleText
    f = f.replace(
      `<div className="pt-8 border-t border-slate-200">\\n        <h3 className="text-xl font-bold text-slate-900 mb-2">${titleText}</h3>`,
      `<table style={{ width: '100%', pageBreakInside: 'avoid', borderCollapse: 'collapse', marginTop: '32px', borderTop: '1px solid #e2e8f0' }}>\\n        <tbody>\\n          <tr>\\n            <td style={{ padding: 0 }}>\\n              <div className="pt-8">\\n        <h3 className="text-xl font-bold text-slate-900 mb-2">${titleText}</h3>`
    );
  } else {
    console.log("Could not find target1 in", filePath);
  }

  // Replace closing divs before the grid
  const target2 = '</div>\\n        </div>\\n        \\n        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 rounded-lg overflow-hidden text-sm">';
  const repl2 = '</div>\\n        </div>\\n              </div>\\n            </td>\\n          </tr>\\n        </tbody>\\n      </table>\\n      \\n      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 rounded-lg overflow-hidden text-sm">';
  
  if (f.includes(target2)) {
    f = f.replace(target2, repl2);
  } else {
    console.log("Could not find target2 in", filePath);
  }

  fs.writeFileSync(filePath, f);
}

fixFile('d:/Yash Coding2/Alien.fi/modules/opportunity-audit/results/OpportunityVisualExtensions.tsx', 'Proposed Architecture Analysis');
fixFile('d:/Yash Coding2/Alien.fi/modules/cost-audit/results/VisualExtensions.tsx', 'Current Architecture Analysis');
