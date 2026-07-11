const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['app', 'components', 'shared', 'modules', 'data', 'config'];
const FILES = ['package.json', 'README.md', 'fix-pdf.js', 'e2e-validation.js', 'test-opportunity-submit.ts', 'test-pdf.ts'];

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath, callback);
        } else {
            callback(fullPath);
        }
    }
}

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    // skip image files
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ico') || filePath.endsWith('.svg') || filePath.endsWith('.woff2')) {
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const replacements = [
        { regex: /Alien.fi/g, text: 'Alien' },
        { regex: /Alien.fi/g, text: 'Alien' },
        { regex: /pixel-punch/g, text: 'alien' },
        { regex: /pixel punch/gi, text: 'Alien' },
        { regex: /Pixel\sPunch/g, text: 'Alien' }
    ];

    for (const { regex, text } of replacements) {
        if (regex.test(content)) {
            content = content.replace(regex, text);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Modified: ${filePath}`);
    }
}

// Process directories
for (const d of DIRECTORIES) {
    walk(path.join(__dirname, d), replaceInFile);
}

// Process root files
for (const f of FILES) {
    replaceInFile(path.join(__dirname, f));
}

console.log("Migration script complete.");
