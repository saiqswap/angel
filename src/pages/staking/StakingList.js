import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  EndPointConstant,
  ENDPOINT_POST_WITHDRAW_HISTORY,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "ID",
    isId: true,
  },
  {
    key: "email",
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
    key: "asset",
    label: "Asset",
    isStatus: true,
  },
  {
    key: "fee",
    label: "Fee",
    isAmount: true,
  },
  {
    key: "receiverAddress",
    label: "Receiver",
    isAddress: true,
  },
  {
    key: "txHash",
    label: "Hash",
    isHash: true,
  },
  {
    key: "status",
    label: "Status",
    isStatus: true,
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
    text: "Withdraw ID",
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
    key: "status",
    type: "select",
    text: "Select status",
    selectName: "WithdrawStatus",
  }),
  new Filter({
    key: "asset",
    type: "select",
    text: "Asset",
    selectName: "Coin",
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

export default function StakingList(props) {
  const Component = new SearchHigherComponent({
    ...props,
    endpoint: EndPointConstant.STAKING_LIST,
    title: "Withdraw history",
    columns,
    filterBy,
    isResend: true,
  });
  return <Component />;
}
