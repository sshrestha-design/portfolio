const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const urls = [
    "https://sagar-shrestha.itch.io/boom-miner",
    "https://sagar-shrestha.itch.io/hellminion",
    "https://sagar-shrestha.itch.io/berlin-berlin",
    "https://sagar-shrestha.itch.io/crowdsurfer",
    "https://sagar-shrestha.itch.io/gravity-switcher",
    "https://sagar-shrestha.itch.io/guidance",
    "https://sagar-shrestha.itch.io/the-new-dress"
  ];

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const imgUrl = await page.evaluate(() => {
        // Find the first screenshot link
        const a = document.querySelector('a[data-image_box]');
        if (a) return a.href;
        const img = document.querySelector('.screenshot');
        if (img) return img.src;
        return null;
      });
      console.log(url.split('/').pop() + ": " + imgUrl);
    } catch (e) {
      console.log(url.split('/').pop() + ": ERROR " + e.message);
    }
  }

  await browser.close();
})();
