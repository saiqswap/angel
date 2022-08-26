import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_POST_ALL_KYC } from "../../constants/endpoint";
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
    key: "email",
    label: "Email",
    isEmail: true,
    userId: "id",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdTime",
    label: "Time",
    isDate: true,
  },
];

const filterBy = [
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
    key: "status",
    type: "select",
    text: "Status",
    selectName: "VerifyStatus",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_ALL_KYC,
  // exportLink: "/user-service/user/export",
  title: "Verification list",
  columns,
  filterBy,
  component: "verification",
  defaultFilter: {
    status: "PENDING",
  },
});
