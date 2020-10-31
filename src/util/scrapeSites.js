const Discord = require('discord.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const scrape = async (url) => {
  return new Promise(async (resolve, reject) => {
    let browser = null;
    let dataObj = {};
    try {
      browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      let message = '';

      const page = await browser.newPage();
      // Configure the navigation timeout
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page
        .waitForSelector('.add-to-cart-button')
        .catch(() => (message = ''));
      if (message === '') {
        dataObj['showTitle'] = await page.title();
        dataObj['available'] = await page.evaluate(() => {
          let button = document.querySelector('.add-to-cart-button').innerText;
          return button;
        });
        let time = new Date();
        console.log(`running, ${time.getHours()}:${time.getMinutes()}`);
        console.table(dataObj['showTitle']);
        console.table(dataObj['available']);

        message = dataObj['available'].toLowerCase();
      }

      if (
        message.toLowerCase() !== 'coming soon' &&
        message.toLowerCase() !== 'sold out'
      ) {
        message = url;
        const embed = await new Discord.MessageEmbed()
          .setTitle('NVIDIA GeForce RTX 3080')
          .addField('URL', url, true)
          .addField('Store', 'bestbuy.com', true)
          .addField('Brand', 'NVIDIA', true)
          .addField('Model', '3080 Founders Edition', true)
          .setDescription(message)
          .setTimestamp()
          .setColor('#7cfc00');

        await webhookClientRobot.send('<@&760440519708639242> Just checked.', {
          username: 'stonkbot',
          avatarURL: 'https://duckduckgo.com/i/46055555.png',
          embeds: [embed],
        });
      }

      return resolve(dataObj);
    } catch (e) {
      return reject(e);
    } finally {
      browser.close();
    }
  });
};

module.exports = scrape;
