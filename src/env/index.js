export const devConfig = {
  API: `https://apiinfinity.feliciastation.com`,
  // API: `https://marketplace_api.megdev.co`,
  API_EXTENSION: `/adm-api`,
  ENV_NAME: "DEVELOP",
  EVN_COLOR: "green",
  baseUrl:
    "https://6f7daba956414f5fa57231546ac07221.s3.ap-southeast-1.amazonaws.com",
};

export const stagingConfig = {
  API: `https://marketplace_api.megdev.co`,
  API_EXTENSION: `/adm-api`,
  ENV_NAME: "STAGING",
  EVN_COLOR: "yellow",
};

export const productionConfig = {
  API: ``,
  API_EXTENSION: `/api`,
  ENV_NAME: "PRODUCTION",
  ENV: "red",
  baseUrl: "https://files.infinityangel.io",
};
