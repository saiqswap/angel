import SearchHigherComponent from "../components/SearchHigherComponent";
import { Filter } from "../settings";

const columns = [
  {
    key: "symbol",
    label: "Symbol",
  },
  {
    key: "contractAddress",
    label: "Contract address",
  },
  {
    key: "decimals",
    label: "Decimals",
  },
  {
    key: "marketTradeEnable",
    label: "Market trade enable",
    isBool: true,
  },
  {
    key: "withdrawEnable",
    label: "Withdraw enable",
    isBool: true,
  },
  {
    key: "withdrawFee",
    label: "Withdraw fee",
  },
];

export default SearchHigherComponent({
  endpoint: `/adm-api/v1/config/contract/list`,
  title: "Contract list",
  columns,
  updateEndpoint: `/adm-api/v1/config/contract`,
  //   deleteEndpoint: `/adm-api/v1/config/contract`,
  getRoles: true,
  createFields: [
    new Filter({
      key: "symbol",
      type: "input",
      text: "Symbol",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "contractAddress",
      type: "input",
      text: "Contract Address",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "decimals",
      type: "input",
      text: "Decimals",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "marketTradeEnable",
      type: "singleCheckbox",
      text: "Market Trade Enable",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "withdrawEnable",
      type: "singleCheckbox",
      text: "Withdraw Enable",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "withdrawFee",
      type: "input",
      text: "Withdraw Fee",
      col: 12,
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "symbol",
      type: "input",
      text: "Symbol",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "contractAddress",
      type: "input",
      text: "Contract Address",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "decimals",
      type: "input",
      text: "Decimals",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "marketTradeEnable",
      type: "singleCheckbox",
      text: "Market Trade Enable",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "withdrawEnable",
      type: "singleCheckbox",
      text: "Withdraw Enable",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "withdrawFee",
      type: "input",
      text: "Withdraw Fee",
      col: 12,
      require: true,
    }),
  ],
});
