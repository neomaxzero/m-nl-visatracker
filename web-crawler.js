const puppeteer = require('puppeteer');

const INPUT_ID = '#plhMain_txtTrackingNo';
const BTN_ID = '#plhMain_btnSubmit';
const STATUSMSG_ID = '#plhMain_lblcurrntst';

const crawler = async (site, trackingNumber = '') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(site, { waitUntil: 'networkidle2' });
  await page.waitFor(INPUT_ID);
  await page.type(INPUT_ID, trackingNumber, { delay: 30 });
  await page.click(BTN_ID);
  await page.waitFor(STATUSMSG_ID);

  const msg = await page.evaluate(
    el => document.querySelector(el).innerText,
    STATUSMSG_ID,
  );

  await page.screenshot({ path: 'example.png' });
  console.log('Snapshot taken at example.png');

  await browser.close();
  return msg;
};

module.exports = crawler;
