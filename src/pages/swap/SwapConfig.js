import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_SWAP_CONFIG,
  ENDPOINT_SWAP_CONFIG_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
  },
  {
    key: "asset",
    label: "Asset",
  },
  {
    key: "quoteAsset",
    label: "Quote asset",
  },
  {
    key: "price",
    label: "Price",
    isAmount: true,
  },
  {
    key: "fee",
    label: "Fee",
    isAmount: true,
  },
  {
    key: "feePercent",
    label: "Fee percent",
    isAmount: true,
  },
  {
    key: "minimum",
    label: "Minimum",
    isAmount: true,
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },

  {
    key: "createdTime",
    label: "Created time",
    isTime: true,
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_SWAP_CONFIG_LIST,
  title: "Swap config",
  columns,
  updateEndpoint: ENDPOINT_SWAP_CONFIG,
  getRoles: true,
  createFields: [
    new Filter({
      key: "asset",
      type: "select",
      text: "Asset",
      col: 12,
      require: true,
      selectName: "Coin",
    }),
    new Filter({
      key: "quoteAsset",
      type: "select",
      text: "Quote asset",
      col: 12,
      require: true,
      selectName: "Coin",
    }),
    new Filter({
      key: "price",
      type: "input",
      text: "Price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "fee",
      type: "input",
      text: "Fee",
      col: 12,
    }),
    new Filter({
      key: "feePercent",
      type: "input",
      text: "Fee percent",
      col: 12,
    }),
    new Filter({
      key: "minium",
      type: "input",
      text: "Minimum",
      col: 12,
    }),
    new Filter({
      key: "isInSystem",
      type: "singleCheckbox",
      text: "Is in system",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "isActive",
      type: "singleCheckbox",
      text: "Active",
      col: 12,
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "asset",
      type: "select",
      text: "Asset",
      col: 12,
      require: true,
      selectName: "Coin",
    }),
    new Filter({
      key: "quoteAsset",
      type: "select",
      text: "Quote asset",
      col: 12,
      require: true,
      selectName: "Coin",
    }),
    new Filter({
      key: "price",
      type: "input",
      text: "Price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "fee",
      type: "input",
      text: "Fee",
      col: 12,
    }),
    new Filter({
      key: "feePercent",
      type: "input",
      text: "Fee percent",
      col: 12,
    }),
    new Filter({
      key: "minium",
      type: "input",
      text: "Minimum",
      col: 12,
    }),
    new Filter({
      key: "isInSystem",
      type: "singleCheckbox",
      text: "Is in system",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "isActive",
      type: "singleCheckbox",
      text: "Active",
      col: 12,
      require: true,
    }),
  ],
});
