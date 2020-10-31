#!/usr/bin/env node

require('dotenv').config();
const CronJob = require('cron').CronJob;
const Discord = require('discord.js');
const app = require('./src/util/keepHerokuAlive');
const {
  webhookClientRobot,
  webhookClientHeartbeat,
  webhookClientReactionListener,
} = require('./src/lib/webhooks/index');
const scrape = require('./src/util/scrapeSites');
const { URL } = require('./constants');

const job = new CronJob({
  cronTime: '0 */1 * * * *',
  onTick: async function () {
    await console.log('\n***You will see this message every 1 minutes ***\n');
    await scrape(URL);
  },
  start: true,
  runOnInit: true,
});

const jobHeartbeat = new CronJob({
  cronTime: '0 */15 * * * *',
  onTick: async function () {
    message = 'I am up and running :)';
    const embed = await new Discord.MessageEmbed()
      .setTitle('stonkbot is healthy')
      .setTimestamp()
      .setDescription(message)
      .setColor('#0099ff');
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

job.start();
jobHeartbeat.start();
