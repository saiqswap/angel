import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_POST_USER_LIST } from "../../constants/endpoint";
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
    userId: "id",
  },
  {
    key: "address",
    label: "Address",
    isAddress: true,
  },
  { key: "limitRiSlot", label: "R-I slot" },
  {
    key: "referralId",
    label: "Referral",
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },
  {
    key: "createdTime",
    label: "Join time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "id",
    type: "input",
    text: "User ID",
  }),
  new Filter({
    key: "email",
    type: "input",
    text: "Email",
  }),
  new Filter({
    key: "address",
    type: "input",
    text: "Address",
  }),
  new Filter({
    key: "referralID",
    type: "input",
    text: "Referral ID",
  }),
  new Filter({
    key: "status",
    type: "select",
    text: "Status",
    selectName: "UserStatus",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_USER_LIST,
  exportLink: "user-list",
  title: "User list",
  columns,
  filterBy,
});
