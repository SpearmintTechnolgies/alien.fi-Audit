const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.alien.fi/', { waitUntil: 'networkidle2' });
  
  const buttons = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('a, button'));
    return els.filter(el => {
      const text = el.innerText || '';
      return text.toLowerCase().includes('start') || text.toLowerCase().includes('project') || text.toLowerCase().includes('audit') || el.classList.contains('button') || el.className.includes('btn');
    }).map(el => ({
      text: el.innerText.trim(),
      html: el.outerHTML,
      className: el.className
    }));
  });
  
  console.log(JSON.stringify(buttons, null, 2));
  await browser.close();
})();
