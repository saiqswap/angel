import { API_EXTENSION } from "../settings";

export const ENDPOINT_LOGIN = `${API_EXTENSION}/v1/admin/login`;
export const ENDPOINT_GET_PROFILE = `${API_EXTENSION}/v1/admin/profile`;
export const ENDPOINT_POST_USER_LIST = `${API_EXTENSION}/v1/user/get-list`;
export const ENDPOINT_POST_BALANCES = `${API_EXTENSION}/v1/fund/balance`;
export const ENDPOINT_POST_FUND_LOGS = `${API_EXTENSION}/v1/fund/get-balance-log`;
export const ENDPOINT_POST_DEPOSIT_HISTORY = `${API_EXTENSION}/v1/fund/deposit`;
export const ENDPOINT_POST_WITHDRAW_HISTORY = `${API_EXTENSION}/v1/fund/get-withdraw`;
export const ENDPOINT_POST_LOT = `/lot/get-all`;
export const ENDPOINT_POST_MINING_HISTORY = `/transaction/get-mine-tx`;
export const ENDPOINT_POST_DIRECT_COMMISSION = `/transaction/get-direct-com`;
export const ENDPOINT_POST_BINARY_COMMISSION = `/transaction/get-binary-com`;
export const ENDPOINT_POST_MATCHING_COMMISSION = `/transaction/get-matching-com`;
export const ENDPOINT_GET_TRANSACTION_STATISTIC = `/transaction/statistic`;
export const ENDPOINT_POST_TRANSACTION = `/transaction/get-tx`;
export const ENDPOINT_GET_PUT_GA = `${API_EXTENSION}/v1/admin/ga`;
export const ENDPOINT_PUT_APPROVE_WITHDRAW = `${API_EXTENSION}/v1/fund/approve-withdraw`;
export const ENDPOINT_PUT_BROADCAST_WITHDRAW = `${API_EXTENSION}/v1/fund/broadcast-withdraw`;
export const ENDPOINT_DELETE_CANCEL_WITHDRAW = `${API_EXTENSION}/v1/fund/cancel-withdraw`;
export const ENDPOINT_PUT_UPDATE_STATUS_WITHDRAW = `${API_EXTENSION}/v1/fund/update-withdraw`;
export const ENDPOINT_GET_PUT_SETTING = `${API_EXTENSION}/v1/setting`;
export const ENDPOINT_POST_PUT_ROLE = `${API_EXTENSION}/v1/admin-role`;
export const ENDPOINT_GET_ROLE = `${API_EXTENSION}/v1/admin-role/get-list`;
export const ENDPOINT_GET_ADMIN = `${API_EXTENSION}/v1/admin/get-list`;
export const ENDPOINT_POST_PUT_ADMIN = `${API_EXTENSION}/v1/admin`;
export const ENDPOINT_PUT_UPDATE_PASSWORD = `${API_EXTENSION}/v1/admin/password`;
export const ENDPOINT_PUT_BLOCK_USER = `/user/disable`;
export const ENDPOINT_PUT_UNBLOCK_USER = `/user/active`;
export const ENDPOINT_PUT_DISABLE_GA_USER = `/user/disable-ga`;
export const ENDPOINT_POST_ALL_COIN = `/coin/get-all`;
export const ENDPOINT_POST_PUT_UPDATE_COIN = `/coin`;
export const ENDPOINT_GET_HOT_WALLET = `/coin/get-hot-wallet`;
export const ENDPOINT_POST_USER_LOGIN = `/user/login`;
export const ENDPOINT_GET_CONFIG = `${API_EXTENSION}/v1/config`;
export const ENDPOINT_GET_DASHBOARD = `/home/dashboard`;
export const ENDPOINT_AFFILIATE_COMMISSION = `${API_EXTENSION}/v1/affiliate/get-commission-history`;

export const ENDPOINT_NEWS_FEED = `/moralis/get-tokens`;
export const ENDPOINT_FEED_DETAIL = `/sn/post`;
export const ENDPOINT_USER = `/user`;

export const ENDPOINT_REGISTER_EVENT = `${API_EXTENSION}/v1/event-register`;
export const ENDPOINT_AIRDROP_NORMAL_BOX = `${API_EXTENSION}/v1/airdrop/normal-box`;
export const ENDPOINT_AIRDROP_SPECIAL_BOX = `${API_EXTENSION}/v1/airdrop/special-box`;
export const ENDPOINT_AIRDROP_WHITELIST = `${API_EXTENSION}/v1/presale/whitelist/import`;
export const ENDPOINT_AIRDROP_GET_WHITELIST = `${API_EXTENSION}/v1/presale/whitelist/get-list`;
export const ENDPOINT_BOX_LIST = `${API_EXTENSION}/v1/box/get-list`;
export const ENDPOINT_INO_LIST = `${API_EXTENSION}/v1/ino/request/get-list`;
export const ENDPOINT_INO_CREATE_TRANSFER = `${API_EXTENSION}/v1/ino/request/create-transfer`;
export const ENDPOINT_INO_SEND_TRANSFER = `${API_EXTENSION}/v1/ino/request/update-transfer`;
export const ENDPOINT_CONFIG_BOX_SYSTEM_LIST = `${API_EXTENSION}/v1/config/system-box/list`;
export const ENDPOINT_CONFIG_BOX_SYSTEM = `${API_EXTENSION}/v1/config/system-box`;
export const ENDPOINT_CONTRACT_LIST = `${API_EXTENSION}/v1/config/contract/list`;
export const ENDPOINT_CONTRACT = `${API_EXTENSION}/v1/config/contract`;
export const ENDPOINT_NFT_GET_LIST = `${API_EXTENSION}/v1/nft/get-list`;
export const ENDPOINT_NFT_TRANSACTION_LIST = `${API_EXTENSION}/v1/nft-transaction/get-list`;
export const ENDPOINT_NFT_MINT = `${API_EXTENSION}/v1/nft/mint`;
export const ENDPOINT_MINTING_BOX_PRODUCT_LIST = `${API_EXTENSION}/v1/presale/product/get-list`;
export const ENDPOINT_MINTING_BOX_PRODUCT = `${API_EXTENSION}/v1/presale/product`;
export const ENDPOINT_MINTING_BOX_COMBO_LIST = `${API_EXTENSION}/v1/presale/combo/get-list`;
export const ENDPOINT_MINTING_BOX_COMBO = `${API_EXTENSION}/v1/presale/combo`;
export const ENDPOINT_MINTING_BOX_TRANSACTION = `${API_EXTENSION}/v1/presale/transaction/get-list`;
export const ENDPOINT_CONFIG_BOX_OPEN_RATE = `${API_EXTENSION}/v1/config/box-open-rate`;
export const ENDPOINT_CONFIG_EQUIPMENT_LIST = `${API_EXTENSION}/v1/config/equipment/list`;
export const ENDPOINT_CONFIG_EQUIPMENT = `${API_EXTENSION}/v1/config/equipment`;
export const ENDPOINT_CONFIG_RI_LIST = `${API_EXTENSION}/v1/config/ri/list`;
export const ENDPOINT_CONFIG_RI = `${API_EXTENSION}/v1/config/ri`;
export const ENDPOINT_MINTING_BOX_PUSH_SOLD_GET_LIST = `${API_EXTENSION}/v1/presale/sold-job/get-list`;
export const ENDPOINT_MINTING_BOX_SETTING_GET_LIST = `${API_EXTENSION}/v1/presale/settings/get-list`;
export const ENDPOINT_MINTING_BOX_SETTING_CREATE = `${API_EXTENSION}/v1/presale/settings`;
export const ENDPOINT_MINTING_BOX_SETTING_UPDATE = `${API_EXTENSION}/v1/presale/settings/update`;
export const ENDPOINT_MINTING_BOX_PUSH_SOLD_UPDATE = `${API_EXTENSION}/v1/presale/sold-job/update`;
export const ENDPOINT_MINTING_BOX_PUSH_SOLD_CREATE = `${API_EXTENSION}/v1/presale/sold-job`;
export const ENDPOINT_MINTING_BOX_EXPORT = `${API_EXTENSION}/v1/reporting/minting`;
//swap
export const ENDPOINT_SWAP_CONFIG_LIST = `${API_EXTENSION}/v1/fund/swap-config/get-list`;
export const ENDPOINT_SWAP_CONFIG = `${API_EXTENSION}/v1/fund/swap-config`;
export const ENDPOINT_RESEND_WITHDRAW = `${API_EXTENSION}/v1/fund/withdraw/re-send`;
export const ENDPOINT_UPLOAD = `${API_EXTENSION}/v1/upload`;

export const EndPointConstant = {
  USER_GET_DEBT_BALANCES: `${API_EXTENSION}/v1/fund/balancedeb`,
  NFT_POST: `${API_EXTENSION}/v1/nft`,
  INO_AIRDROP_TOKEN: `${API_EXTENSION}/v1/ino/airdrop-token`,
  INO_AIRDROP_TOKEN_GET_LIST: `${API_EXTENSION}/v1/ino/airdrop-token/get-list`,
  CONFIG_RI_AUTO_GET_LIST: `${API_EXTENSION}/v1/config/ri-auto/get-list`,
  CONFIG_RI_AUTO: `${API_EXTENSION}/v1/config/ri-auto`,
  CONFIG_RI_AUTO_SLOT: `${API_EXTENSION}/v1/config/ri-auto/slot`,
  STAKING_LIST: `${API_EXTENSION}/v1/staking/list`,
  STAKING_PACKAGES: `${API_EXTENSION}/v1/staking/package/list`,
  STAKING_PACKAGE_CREATE: `${API_EXTENSION}/v1/staking/package`,
  RI_REWARD_GET_LIST: `${API_EXTENSION}/v1/fund/reward-config/get-list`,
  RI_REWARD: `${API_EXTENSION}/v1/fund/reward-config`,
  RI_FACTORY_DELETE_SLOT: `${API_EXTENSION}/v1/config/ri-auto/slot`,
};

export const ENDPOINT_NFT_TO_ING_LOGS = `${API_EXTENSION}/v1/swap-nft-to-ing-lock/log`;
