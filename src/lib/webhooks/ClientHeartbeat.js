const Discord = require('discord.js');

const webhookClientHeartbeat = new Discord.WebhookClient(
  process.env.DEMSTONKS_HEARTBEAT_ID,
  process.env.DEMSTONKS_HEARTBEAT_TOKEN
);

module.exports = webhookClientHeartbeat;
