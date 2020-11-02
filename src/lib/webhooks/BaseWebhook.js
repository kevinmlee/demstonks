const Discord = require('discord.js');

class BaseWebhook {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    this.webhookClient;
  }

  build() {
    if (!this.id || !this.token) throw new Error('Missing Discord Credentials');
    this.webhookClient = new Discord.WebhookClient(this.id, this.token);
  }
}

module.exports = BaseWebhook;
