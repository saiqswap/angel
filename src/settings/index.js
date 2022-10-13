import {
  devConfig,
  localConfig,
  productionConfig,
  stagingConfig,
} from "../env";

export const ACCESS_TOKEN_KEY = "CBt3gpbqeMdWPNG1";
export const DEVICE_KEY = "uU5tEUmAgvBWArsv";
export const SCOPES_KEY = "AhBcmvr1EkMdPnL5";
const hostname = window.location.hostname.replace("www.", "");
const domains = {};
const envConfigs = {
  localhost: devConfig,
  "admininfinity.feliciastation.com": devConfig,
  "marketplace_admin.megdev.co": stagingConfig,
};
const envConfig = envConfigs[hostname]
  ? envConfigs[hostname]
  : productionConfig;
export const { API, API_EXTENSION, ENV_NAME, baseUrl } = envConfig;
export const USER_API = ``;
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

export function _getImage(image) {
  return `${baseUrl}/${image}`;
}
