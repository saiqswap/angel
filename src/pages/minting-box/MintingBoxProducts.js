import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_MINTING_BOX_PRODUCT,
  ENDPOINT_MINTING_BOX_PRODUCT_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
  },
  {
    key: "boxType",
    label: "Box Type",
  },
  {
    key: "roundNumber",
    label: "Round",
  },
  {
    key: "unitPrice",
    label: "Price",
  },
  {
    key: "paymentCurrency",
    label: "Asset",
  },
  {
    key: "supply",
    label: "Total Sell",
    isAmount: true,
  },
  {
    key: "available",
    label: "Available",
    isAmount: true,
  },
  {
    key: "sold",
    label: "Sold",
    isAmount: true,
  },
  {
    key: "minOrder",
    label: "Min",
  },
  {
    key: "maxOrder",
    label: "Max",
  },
  {
    key: "startTime",
    label: "Start",
    isTime: true,
  },
  {
    key: "endTime",
    label: "End",
    isTime: true,
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_MINTING_BOX_PRODUCT_LIST,
  title: "Minting Box",
  columns,
  updateEndpoint: ENDPOINT_MINTING_BOX_PRODUCT,
  getRoles: true,
  createFields: [
    new Filter({
      key: "roundNumber",
      type: "input",
      text: "Round",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "boxType",
      type: "select",
      text: "Box Type",
      col: 12,
      require: true,
      selectName: "BOX_TYPES",
    }),
    new Filter({
      key: "unitPrice",
      type: "input",
      text: "Price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "supply",
      type: "input",
      text: "Total Sell",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "available",
      type: "input",
      text: "Available",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "minOrder",
      type: "input",
      text: "Min",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "maxOrder",
      type: "input",
      text: "Max",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "paymentContract",
      type: "SELECT_PAYMENT_CONTRACT",
      text: "Asset",
      col: 12,
      require: true,
      selectName: "PAYMENT_CONTRACTS",
    }),
    new Filter({
      key: "startTime",
      type: "input",
      text: "Start",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "endTime",
      type: "input",
      text: "End",
      col: 6,
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
      key: "roundNumber",
      type: "input",
      text: "Round",
      col: 12,
      require: true,
      disabled: true,
    }),
    new Filter({
      key: "boxType",
      type: "input",
      text: "Box Type",
      col: 12,
      require: true,
      selectName: "BOX_TYPES",
    }),
    new Filter({
      key: "unitPrice",
      type: "input",
      text: "Price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "supply",
      type: "input",
      text: "Total Sell",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "available",
      type: "input",
      text: "Available",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "minOrder",
      type: "input",
      text: "Min",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "maxOrder",
      type: "input",
      text: "Max",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "paymentContract",
      type: "SELECT_PAYMENT_CONTRACT",
      text: "Asset",
      col: 12,
      require: true,
      selectName: "PAYMENT_CONTRACTS",
    }),
    new Filter({
      key: "startTime",
      type: "input",
      text: "Start",
      col: 6,
      require: true,
    }),
    new Filter({
      key: "endTime",
      type: "input",
      text: "End",
      col: 6,
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
