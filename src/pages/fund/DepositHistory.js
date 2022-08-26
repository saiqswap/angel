import SearchHigherComponent from "../../components/SearchHigherComponent";
import { Filter } from "../../settings";
import { ENDPOINT_POST_DEPOSIT_HISTORY } from "../../constants/endpoint";

const columns = [
  {
    key: "id",
    label: "ID",
    isId: true,
  },
  {
    key: "username",
    label: "Username",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "amount",
    label: "Amount",
    isAmount: true,
  },
  {
    key: "asset",
    label: "Asset",
    isStatus: true,
  },
  {
    key: "address",
    label: "Address",
    isAddress: true,
  },
  {
    key: "txId",
    label: "Hash",
    isHash: true,
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "from",
    type: "date",
    text: "From date",
  }),
  new Filter({
    key: "to",
    type: "date",
    text: "To date",
  }),
  new Filter({
    key: "id",
    type: "input",
    text: "Deposit ID",
  }),
  new Filter({
    key: "email",
    type: "input",
    text: "Email",
  }),
  new Filter({
    key: "username",
    type: "input",
    text: "Username",
  }),
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "TransferType",
  }),
  new Filter({
    key: "asset",
    type: "select",
    text: "Asset",
    list: ["USDT", "BTC", "FIL"],
  }),
  new Filter({
    key: "txId",
    type: "input",
    text: "Hash",
  }),
  new Filter({
    key: "wallet",
    type: "input",
    text: "Wallet",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_DEPOSIT_HISTORY,
  // exportLink: "/user-service/user/export",
  title: "Deposit history",
  columns,
  filterBy,
});
