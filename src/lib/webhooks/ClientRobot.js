const Discord = require('discord.js');
const {
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN,
} = require('../../../constants');
const BaseWebhook = require('./BaseWebhook');

class WebhookClientRobot extends BaseWebhook {
  constructor(id, token) {
    super(id, token);
  }

  async send(str, { username, avatarURL, embeds }) {
    console.log('SENDING', str, username, avatarURL, embeds);
    await this.webhookClient.send(str, { username, avatarURL, embeds });
  }
}

module.exports = new WebhookClientRobot(
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN
);
