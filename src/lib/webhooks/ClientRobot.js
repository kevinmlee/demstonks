const Discord = require('discord.js');
const {
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN,
} = require('../../../constants');

const webhookClientRobot = new Discord.WebhookClient(
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN
);

module.exports = webhookClientRobot;
