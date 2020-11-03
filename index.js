#!/usr/bin/env node

const CronJob = require('cron').CronJob;
const Discord = require('discord.js');
// const app = require('./src/util/keepHerokuAlive');
const {
  WebhookClientRobot,
  WebhookClientHeartbeat,
  WebhookClientReactionListener,
} = require('./src/lib/webhooks/index');
const scrapeSites = require('./src/lib/scrapeSites');

const job = new CronJob({
  //cronTime: '0 */3 * * * *',
  cronTime: '0 */1 * * * *',
  onTick: async function () {
    await console.log('\n***You will see this message every 3 minutes ***\n');
    await scrapeSites();
  },
  start: true,
  runOnInit: true,
});

// const jobHeartbeat = new CronJob({
//   cronTime: '0 */15 * * * *',
//   onTick: async function () {
//     message = 'I am up and running :)';
//     const embed = await new Discord.MessageEmbed()
//       .setTitle('stonkbot is healthy')
//       .setTimestamp()
//       .setDescription(message)
//       .setColor('#0099ff');

//     await WebhookClientHeartbeat.send('', {
//       username: 'stonkbot',
//       avatarURL: 'https://duckduckgo.com/i/46055555.png',
//       embeds: [embed],
//     });
//   },
//   start: true,
//   runOnInit: true,
// });

const start = async () => {
  // WebhookClientHeartbeat.build();
  WebhookClientRobot.build();
  // jobHeartbeat.start();
  job.start();
  // await scrapeSites();
};

start();
// jobHeartbeat.start();
