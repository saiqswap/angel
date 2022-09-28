import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_MINTING_BOX_TRANSACTION } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
  },
  {
    key: "userId",
    label: "User ID",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "ref",
    label: "Ref ID",
  },
  {
    key: "productId",
    label: "Product ID",
  },
  {
    key: "comboId",
    label: "Combo ID",
  },
  {
    key: "txHash",
    label: "TX Hash",
    isAddress: true,
  },
  {
    key: "quantity",
    label: "Quantity",
    isAmount: true,
  },
  {
    key: "totalPrice",
    label: "Total",
    isAmount: true,
  },
  {
    key: "currency",
    label: "Asset",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "userId",
    text: "User ID",
    type: "input",
  }),
  new Filter({
    key: "txHash",
    text: "TX Hash",
    type: "input",
  }),
  new Filter({
    key: "productId",
    text: "Product ID",
    type: "input",
  }),
  new Filter({
    key: "status",
    text: "Status",
    type: "select",
    selectName: "PresaleTransactionStatus",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_MINTING_BOX_TRANSACTION,
  title: "Transaction",
  columns,
  getRoles: true,
  filterBy,
});
