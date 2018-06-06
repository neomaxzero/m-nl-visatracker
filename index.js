const crawl = require('./web-crawler');
const logger = require('./logger');

const SITE_URL =
  'https://www.vfsvisaonline.com/Netherlands-Global-Online-Tracking_Zone3/Track.aspx';

const trackingNumberA = '';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getMsgAndWrite = async () => {
  console.info('Getting information...');
  try {
    const message = await crawl(SITE_URL, trackingNumberA);
    logger.log('info', message);
  } catch (err) {
    logger.log('error', err);
  }
};

// const waitAndWait = async () => {
//   await timeout(3000);
//   console.log('EEE');
// };

const minutes = 60;
const interval = 1000 * 60 * minutes;
setInterval(getMsgAndWrite, interval);
