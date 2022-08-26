import SearchHigherComponent from "../components/SearchHigherComponent";
import { Filter } from "../settings";

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
    key: "fromAddress",
    label: "From",
    isAddress: true,
  },
  {
    key: "toAddress",
    label: "To",
    isAddress: true,
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
    key: "coin",
    label: "Coin",
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
    key: "from",
    type: "date",
    text: "From",
  }),
  new Filter({
    key: "to",
    type: "date",
    text: "To",
  }),
  new Filter({
    key: "userId",
    type: "input",
    text: "User ID",
  }),
  new Filter({
    key: "coin",
    type: "select",
    text: "Coin",
    selectName: "Coin",
  }),
  new Filter({
    key: "fromAddress",
    type: "input",
    text: "From Address",
  }),
  new Filter({
    key: "toAddress",
    type: "input",
    text: "To Address",
  }),
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "NFT_TRANSACTION_STATUS",
  }),
];

export default SearchHigherComponent({
  endpoint: `/adm-api/v1/nft-transaction/get-list`,
  title: "Transaction",
  columns,
  getRoles: true,
  filterBy,
});
