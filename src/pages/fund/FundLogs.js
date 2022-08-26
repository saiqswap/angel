import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_POST_FUND_LOGS } from "../../constants/endpoint";
import { Filter } from "../../settings";
const columns = [
  // {
  //   key: "userId",
  //   label: "User ID",
  //   isId: true
  // },
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
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "text",
    label: "Note",
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_FUND_LOGS,
  columns,
  requireFilter: "userId",
  title: "Fund logs",
  filterBy: [
    new Filter({
      key: "userId",
      type: "input",
      text: "User ID",
    }),
    new Filter({
      key: "type",
      type: "input",
      text: "Type",
    }),
    new Filter({
      key: "asset",
      type: "select",
      text: "Asset",
      selectName: "Coin",
    }),
  ],
});
