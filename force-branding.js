const fs = require('fs');
const path = require('path');

const dirsToScan = ['app', 'shared', 'src', 'config'];
const rootFiles = ['package.json', 'README.md', 'tailwind.config.js'];

let filesChanged = 0;
const changedLog = [];

function scanAndReplace(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  
  if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    for (const file of files) {
      scanAndReplace(path.join(filePath, file));
    }
  } else if (stat.isFile()) {
    const ext = path.extname(filePath);
    if (!['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.html'].includes(ext)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/Alien.fi/g, 'Alien');
    content = content.replace(/Alien.fi/g, 'Alien');
    content = content.replace(/Alien.fi/g, 'Alien');
    content = content.replace(/Alien.fi\.org/g, 'alien.fi');
    content = content.replace(/Alien.fi/g, 'alien');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      changedLog.push(filePath);
    }
  }
}

dirsToScan.forEach(dir => scanAndReplace(path.join(__dirname, dir)));
rootFiles.forEach(file => scanAndReplace(path.join(__dirname, file)));

console.log("BRANDING AUDIT COMPLETE");
console.log(`Files modified: ${filesChanged}`);
changedLog.forEach(file => console.log(`- ${file}`));
