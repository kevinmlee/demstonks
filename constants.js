require('dotenv').config();

const PORT = process.env.PORT || 5000;

const STORES = {
  bestbuy: {
    3070: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3070-8g-gddr6-pci-express-4-0-graphics-card-black/6437909.p?skuId=6437909',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3070-xc3-black-gaming-8gb-gddr6x-pci-express-4-0-graphics-card/6439300.p?skuId=6439300',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3070-8g-gddr6-pci-express-4-0-graphics-card-black/6437912.p?skuId=6437912',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3070-8gb-dual-fan-graphics-card/6432654.p?skuId=6432654',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3070-8gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432653.p?skuId=6432653',
    ],
    3080: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-xc3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6432400.p?skuId=6432400',
      'https://www.bestbuy.com/site/msi-geforce-rtx-3080-ventus-3x-10g-oc-bv-gddr6x-pci-express-4-0-graphic-card-black-silver/6430175.p?skuId=6430175',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-black/6436223.p?skuId=6436223',
      'https://www.bestbuy.com/site/pny-geforce-rtx-3080-10gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432655.p?skuId=6432655',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-xc3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6436195.p?skuId=6436195',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3080-ftw3-ultra-gaming-10gb-gddr6x-pci-express-4-0-graphics-card/6436196.p?skuId=6436196',
      'https://www.bestbuy.com/site/asus-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432445.p?skuId=6432445',
    ],
    3090: [
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3090-24gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429434.p?skuId=6429434',
      'https://www.bestbuy.com/site/evga-geforce-rtx-3090-ftw3-ultra-gaming-24gb-gddr6x-pci-express-4-0-graphics-card/6436192.p?skuId=6436192',
      'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3090-24g-gddr6x-pci-express-4-0-graphics-card-black/6437910.p?skuId=6437910',
      'https://www.bestbuy.com/site/asus-geforce-rtx-3090-24gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432447.p?skuId=6432447',
      'https://www.bestbuy.com/site/asus-tuf-rtx-3090-24gb-gddr6x-pci-express-4-0-graphics-card-black/6432446.p?skuId=6432446',
    ],
    button: '.add-to-cart-button',
  },
  newegg: {
    3070: [],
    3080: [],
    3090: [],
  },
};

const DEMSTONKS_CLIENT_ID = process.env.DEMSTONKS_CLIENT_ID || null;
const DEMSTONKS_BOT_TOKEN = process.env.DEMSTONKS_BOT_TOKEN || null;
const DEMSTONKS_HEARTBEAT_ID = process.env.DEMSTONKS_HEARTBEAT_ID || null;
const DEMSTONKS_HEARTBEAT_TOKEN = process.env.DEMSTONKS_HEARTBEAT_TOKEN || null;
const DEMSTONKS_BOT_APP_TOKEN = process.env.DEMSTONKS_BOT_APP_TOKEN || null;
const SERVER_ID = '641091138123595789';
const ALLOWED_EMOJIS = ['rtx3070', 'rtx3080', 'rtx3090'];
const THIRTY_SEVENTY_ROLE = '772204916872577034';
const THIRTY_EIGHTY_ROLE = '772238199749476362';
const THIRTY_NINETY_ROLE = '772263446997368882';

module.exports = {
  PORT,
  STORES,
  DEMSTONKS_CLIENT_ID,
  DEMSTONKS_BOT_TOKEN,
  DEMSTONKS_HEARTBEAT_ID,
  DEMSTONKS_HEARTBEAT_TOKEN,
  DEMSTONKS_BOT_APP_TOKEN,
  SERVER_ID,
  ALLOWED_EMOJIS,
  THIRTY_SEVENTY_ROLE,
  THIRTY_EIGHTY_ROLE,
  THIRTY_NINETY_ROLE,
};
