const fs = require('fs');
const data = fs.readFileSync('public/assets/logo/logo-black-transparent.png');
const b64 = 'data:image/png;base64,' + data.toString('base64');
fs.writeFileSync('modules/shared/logoBase64.ts', 'export const LOGO_BASE64 = "' + b64 + '";\n');
console.log('Success');
