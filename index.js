#!/usr/bin/env node

require("dotenv").config();
const CronJob = require("cron").CronJob;
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const Discord = require("discord.js");
const app = require("./src/util/keepHerokuAlive");

const SERVER_ID = "641091138123595789";
const webhookClientRobot = new Discord.WebhookClient(
  process.env.DEMSTONKS_CLIENT_ID,
  process.env.DEMSTONKS_BOT_TOKEN
);
const webhookClientReactionListener = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const webhookClientHeartbeat = new Discord.WebhookClient(
  process.env.DEMSTONKS_HEARTBEAT_ID,
  process.env.DEMSTONKS_HEARTBEAT_TOKEN
);

const scrape = (url) => {
  return new Promise(async (resolve, reject) => {
    let browser = null;
    let dataObj = {};
    try {
      browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      let message = "";

      const page = await browser.newPage();
      // Configure the navigation timeout
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page
        .waitForSelector(".add-to-cart-button")
        .catch(() => (message = ""));
      if (message === "") {
        dataObj["showTitle"] = await page.title();
        dataObj["available"] = await page.evaluate(() => {
          let button = document.querySelector(".add-to-cart-button").innerText;
          return button;
        });
        let time = new Date();
        console.log(`running, ${time.getHours()}:${time.getMinutes()}`);
        console.table(dataObj["showTitle"]);
        console.table(dataObj["available"]);

        message = dataObj["available"].toLowerCase();
      }

      if (
        message.toLowerCase() !== "coming soon" &&
        message.toLowerCase() !== "sold out"
      ) {
        message = url;
        const embed = await new Discord.MessageEmbed()
          .setTitle("NVIDIA GeForce RTX 3080")
          .addField("URL", url, true)
          .addField("Store", "bestbuy.com", true)
          .addField("Brand", "NVIDIA", true)
          .addField("Model", "3080 Founders Edition", true)
          .setDescription(message)
          .setTimestamp()
          .setColor("#7cfc00");

        await webhookClientRobot.send("<@&760440519708639242> Just checked.", {
          username: "stonkbot",
          avatarURL: "https://duckduckgo.com/i/46055555.png",
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

const url =
  // "https://www.nvidia.com/de-de/geforce/graphics-cards/30-series/rtx-3080/?nvid=nv-int-gfhm-33950";
  //"https://www.notebooksbilliger.de/nvidia+geforce+rtx+3080+founders+edition+683301";
  "https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440&ref=186&loc=nvidia_6429440";

const job = new CronJob({
  cronTime: "0 */1 * * * *",
  onTick: async function () {
    await console.log("\n***You will see this message every 1 minutes ***\n");
    await scrape(url);
  },
  start: true,
  runOnInit: true,
});

const jobHeartbeat = new CronJob({
  cronTime: "0 */15 * * * *",
  onTick: async function () {
    message = "I am up and running :)";
    const embed = await new Discord.MessageEmbed()
      .setTitle("stonkbot is healthy")
      .setTimestamp()
      .setDescription(message)
      .setColor("#0099ff");
    /*
    await webhookClientHeartbeat.send("", {
      username: "stonkbot",
      avatarURL: "https://duckduckgo.com/i/46055555.png",
      embeds: [embed],
    });
    */
  },
  start: true,
  runOnInit: true,
});

webhookClientReactionListener.on(
  "messageReactionAdd",
  async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Something went wrong when fetching the message: ",
          error
        );
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    // Now the message has been cached and is fully available
    console.log(`${reaction.count} user(s) have reacted to this message.`);
    console.log(`${reaction.emoji.name} emoji added by "${user.username}".`);

    webhookClientReactionListener.users.cache.get(user.id).send(`
      Hey ${user.username}! You've subscribed to notifications for this: ${reaction.emoji.name}.
    `);

    //Handle subscription process
    const guild = await webhookClientReactionListener.guilds.cache.get(
      SERVER_ID
    );
    let roleName = reaction.emoji.name;
    let role = guild.roles.cache.find((x) => x.name === roleName);

    if (!role) {
      // Role doesn't exist, safe to create a new role
      guild.roles
        .create({
          data: {
            name: roleName,
            color: "#B8BBBE",
          },
        })
        .then(console.log)
        .catch(console.error);
    }

    //assign user to role
    let member = guild.members.cache.find((member) => member.id === user.id);
    member.roles.add(role);
  }
);

webhookClientReactionListener.on(
  "messageReactionRemove",
  async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Something went wrong when fetching the message: ",
          error
        );
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    // Now the message has been cached and is fully available
    console.log(`${reaction.count} user(s) have reacted to this message.`);
    console.log(`${reaction.emoji.name} emoji added by "${user.username}".`);

    webhookClientReactionListener.users.cache.get(user.id).send(`
      Hey ${user.username}! Just letting you know that you've just unsubscribed to notifications for this: ${reaction.emoji.name}.
    `);

    //Handle subscription process
    const guild = await webhookClientReactionListener.guilds.cache.get(
      SERVER_ID
    );
    let roleName = reaction.emoji.name;
    let role = guild.roles.cache.find((x) => x.name === roleName);

    if (role) {
      //assign user to role
      let member = guild.members.cache.find((member) => member.id === user.id);
      member.roles.remove(role);
    }
  }
);

webhookClientReactionListener.on("message", (message) => {
  console.log(message.content);
});

webhookClientReactionListener.once("ready", () => {
  console.log("stonkbot ready to annoy people!");
});

// initialize
webhookClientReactionListener.login(process.env.DEMSTONKS_BOT_APP_TOKEN);
job.start();
jobHeartbeat.start();
