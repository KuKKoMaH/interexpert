const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const createdScreenshots = {};
  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  const distDir = path.resolve(__dirname, 'dist');
  const files = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
  const browser = await puppeteer.launch({
    channel:  'chrome',
    // headless: false,
    args:     ['--allow-file-access-from-files', '--enable-local-file-accesses']
  });

  const screenshots = fs.readdirSync(screenshotsDir);
  for (const file of screenshots) {
    fs.unlinkSync(path.join(screenshotsDir, file));
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1180, height: 1080 });

  for (let file of files) {
    await page.goto('file://' + path.resolve(distDir, file), { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    const elements = await page.$$('.block');
    for (let el of elements) {
      const classNames = await (await el.getProperty('className')).jsonValue();
      let className = classNames.split(' ').find(className => !className.includes('block'));
      if (createdScreenshots[className]) {
        createdScreenshots[className]++;
        className += "-" + createdScreenshots[className];
      } else {
        createdScreenshots[className] = 1;
      }
      await el.screenshot({ path: path.resolve(screenshotsDir, className + '.png') });
    }
  }
  await browser.close();
})();