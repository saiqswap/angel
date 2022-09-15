export const ACCESS_TOKEN_KEY = "CBt3gpbqeMdWPNG1";
export const DEVICE_KEY = "uU5tEUmAgvBWArsv";
export const SCOPES_KEY = "AhBcmvr1EkMdPnL5";

const hostname = window.location.hostname.replace("www.", "");

// const APIs = [];
// export const API = APIs[hostname]
//   ? APIs[hostname]
//   : `https://marketplace_api.megdev.co`;

// const USER_APIs = [];
// export const USER_API = APIs[hostname]
//   ? USER_APIs[hostname]
//   : `https://nftcapi.ganet.io/api`;

// export const API = `https://marketplace_api.megdev.co`;
// export const API_EXTENSION =`/adm-api`
export const API = ``;
export const API_EXTENSION = `/api`;

export const USER_API = ``;

const domains = {
  // localhost: "http://localhost:3000",
  // "mininggerer.spdev.co": "https://mining.spdev.co",
  // "dodo.miningclub.org": "https://miningclub.org",
};
export const USER_DOMAIN = domains[hostname];

export function Filter({
  key,
  type,
  text,
  defaultValue,
  list,
  col,
  require,
  disabled,
  selectName,
}) {
  this.key = key;
  this.type = type;
  this.text = text;
  this.list = list;
  this.col = col;
  this.require = require;
  this.defaultValue = defaultValue;
  this.disabled = disabled;
  this.selectName = selectName;
}

console.log("Version: 0.0.1");

export function _getImage(image) {
  return `https://6f7daba956414f5fa57231546ac07221.s3.ap-southeast-1.amazonaws.com/${image}`;
}
