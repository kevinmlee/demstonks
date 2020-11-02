const BaseWebhook = require('./BaseWebhook');
const {
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN,
} = require('../../../constants');

class WebhookClientHeartbeat extends BaseWebhook {
  constructor(id, token) {
    super(id, token);
  }

  send(name = '', { username, avatarURL, embeds }) {
    this.webhookClient.send(name, { username, avatarURL, embeds });
  }
}

module.exports = new WebhookClientHeartbeat(
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN
);
