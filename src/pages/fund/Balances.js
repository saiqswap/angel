import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_POST_BALANCES } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "username",
    label: "Username",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "amount",
    label: "Amount",
    isAmount: true,
  },
  {
    key: "blockAmount",
    label: "Block amount",
    isAmount: true,
  },
  {
    key: "asset",
    label: "Asset",
    isStatus: true,
  },
  {
    key: "updatedTime",
    label: "Last update",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "username",
    type: "input",
    text: "Username",
  }),
  new Filter({
    key: "asset",
    type: "select",
    text: "Select asset",
    selectName: "Coin",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_BALANCES,
  // exportLink: "/user-service/user/export",
  title: "Balances list",
  columns,
  filterBy,
});
