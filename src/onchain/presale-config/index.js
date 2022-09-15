const ABI = require("./abi");
module.exports = {
  ESCROW_CONTRACT_ADDRESS: "0x8EF11325be1C3a4ffb4a803533E770eD7A6b0Cc6",
  ESCROW_CONTRACT_ABI: ABI.Escrow,
  ESCROW_VESTING_CONTRACT_ADDRESS: "0x95BE0a85EEDcc69C44e69B4DE4A796fa37D62937",
  ESCROW_VESTING_CONTRACT_ABI: ABI.Escrow_Vesting,

  NODE_RPC_URL: "https://polygon-testnet.public.blastapi.io",
  // ARR_PARSE_TO_SHORT: ["maxQty", "minQty", "cost", "remaining", "totalSupply"],
  // ABI_TOKEN_PAID: [
  //   "event Purchase(address indexed roundId, address indexed buyer, string indexed ref, address paymentToken, uint256 paymentAmout, uint256 tokenAmount, bool isReceiveToken)",
  // ],
  // EVENT_PURCHASE_TOPICS:
  //   "0xbc53a9d5e145a7ed15eafb5fc0e4f93375792cfb515f56be7ae5a5418189ebe4",
};
