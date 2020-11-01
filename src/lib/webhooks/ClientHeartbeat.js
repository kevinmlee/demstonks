const Discord = require('discord.js');
const {
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN,
} = require('../../../constants');

const webhookClientHeartbeat = new Discord.WebhookClient(
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN
);

module.exports = webhookClientHeartbeat;
