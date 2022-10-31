import SearchHigherComponent from "../../components/SearchHigherComponent";
import { EndPointConstant } from "../../constants/endpoint";

const columns = [
  {
    key: "id",
    label: "ID",
    isId: true,
  },
  {
    key: "userEmail",
    label: "Email",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "amount",
    label: "Amount",
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
    key: "timeToNextPay",
    label: "Next Time To Pay",
    isDate: true,
  },
  {
    key: "startTime",
    label: "Start Time",
    isDate: true,
  },
  {
    key: "endTime",
    label: "End Time",
    isDate: true,
  },
  {
    key: "createdTime",
    label: "Created Time",
    isDate: true,
  },
];

const filterBy = [
  // new Filter({
  //   key: "from",
  //   type: "date",
  //   text: "From date",
  // }),
  // new Filter({
  //   key: "to",
  //   type: "date",
  //   text: "To date",
  // }),
  // new Filter({
  //   key: "id",
  //   type: "input",
  //   text: "Withdraw ID",
  // }),
  // new Filter({
  //   key: "username",
  //   type: "input",
  //   text: "Username",
  // }),
  // new Filter({
  //   key: "type",
  //   type: "select",
  //   text: "Type",
  //   selectName: "TransferType",
  // }),
  // new Filter({
  //   key: "status",
  //   type: "select",
  //   text: "Select status",
  //   selectName: "WithdrawStatus",
  // }),
  // new Filter({
  //   key: "asset",
  //   type: "select",
  //   text: "Asset",
  //   selectName: "Coin",
  // }),
  // new Filter({
  //   key: "txId",
  //   type: "input",
  //   text: "Hash",
  // }),
  // new Filter({
  //   key: "wallet",
  //   type: "input",
  //   text: "Wallet",
  // }),
];

export default function StakingList(props) {
  const Component = new SearchHigherComponent({
    ...props,
    endpoint: EndPointConstant.STAKING_LIST,
    title: "Staking list",
    columns,
    filterBy,
  });
  return <Component />;
}
