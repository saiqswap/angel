import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_GET_REFERRAL,
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
    userId: "id",
  },
  {
    key: "username",
    label: "Username",
    isEmail: true,
    userId: "id",
  },
  {
    key: "level",
    label: "Level",
    isLevel: true,
  },
  {
    key: "rank",
    label: "Rank",
  },
  {
    key: "package",
    label: "Package",
  },
  {
    key: "leftPv",
    label: "Left PV",
    isAmount: true,
  },
  {
    key: "rightPv",
    label: "Right PV",
    isAmount: true,
  },
];

const filterBy = [
  new Filter({
    key: "userId",
    type: "input",
    text: "User ID",
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
    key: "level",
    type: "select",
    text: "Select level",
    selectName: "Level",
  }),
  new Filter({
    key: "rank",
    type: "select",
    text: "Select rank",
    selectName: "Rank",
  }),
  new Filter({
    key: "package",
    type: "select",
    text: "Select package",
    selectName: "Package",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_GET_REFERRAL,
  // exportLink: "/user-service/user/export",
  //   title: "User list",
  //   component: "referrals",
  columns,
  filterBy,
  note: "referrals",
});
