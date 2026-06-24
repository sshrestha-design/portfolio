const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load the HTML file we just created
  const htmlPath = 'file:///Users/sagarshrestha/.gemini/antigravity/brain/0fbaa73c-6007-45d4-9854-6fc8d8582ea6/resume.html';
  await page.goto(htmlPath, { waitUntil: 'networkidle' });

  // Generate PDF
  const pdfPath = '/Users/sagarshrestha/Desktop/Sagar_Shrestha_Level_Designer_Resume.pdf';
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });

  console.log(`PDF successfully generated at: ${pdfPath}`);
  await browser.close();
})();
