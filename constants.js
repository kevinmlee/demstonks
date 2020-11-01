require('dotenv').config();

const PORT = process.env.PORT || 5000;

const URL =
  'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440&ref=186&loc=nvidia_6429440';
const DEMSTONKS_CLIENT_ID = process.env.DEMSTONKS_CLIENT_ID || null;
const DEMSTONKS_BOT_TOKEN = process.env.DEMSTONKS_BOT_TOKEN || null;
const DEMSTONKS_HEARTBEAT_ID = process.env.DEMSTONKS_HEARTBEAT_ID || null;
const DEMSTONKS_HEARTBEAT_TOKEN = process.env.DEMSTONKS_HEARTBEAT_TOKEN || null;
const SERVER_ID = '641091138123595789';

module.exports = {
  PORT,
  URL,
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN,
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN,
  SERVER_ID,
};
