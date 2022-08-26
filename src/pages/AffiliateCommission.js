import SearchHigherComponent from "../components/SearchHigherComponent";
import { ENDPOINT_AFFILIATE_COMMISSION } from "../constants/endpoint";
import { Filter } from "../settings";

const columns = [
  {
    key: `refId`,
    label: ``,
    isId: true,
  },
  {
    key: "senderEmail",
    label: "Sender",
    isEmail: true,
    userId: "senderId",
  },
  {
    key: "senderId",
    label: "Sender ID",
    isEmail: true,
    userId: "senderId",
  },
  {
    key: "userId",
    label: "Receiver ID",
    isEmail: true,
    userId: "userId",
  },
  {
    key: `boxType`,
    label: `Box Type`,
  },
  {
    key: `price`,
    label: `Price`,
    isAmount: true,
  },
  {
    key: `amount`,
    label: `Amount`,
    isAmount: true,
  },
  {
    key: `coin`,
    label: `Asset`,
  },
  {
    key: "createdTime",
    label: "Created time",
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
    key: "userId",
    type: "input",
    text: "Receiver ID",
  }),
  new Filter({
    key: "coin",
    type: "select",
    text: "Coin",
    selectName: "Coin",
  }),
  new Filter({
    key: "senderEmail",
    type: "input",
    text: "Sender Email",
  }),
  new Filter({
    key: "senderAddress",
    type: "input",
    text: "Sender Address",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_AFFILIATE_COMMISSION,
  title: "Affiliate Commission",
  columns,
  filterBy,
  getRoles: true,
});
