import SearchHigherComponent from "../components/SearchHigherComponent";
import {
  ENDPOINT_GET_ADMIN,
  ENDPOINT_POST_PUT_ADMIN,
} from "../constants/endpoint";
import { Filter } from "../settings";

const columns = [
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "createdTime",
    label: "Created time",
    isDate: true,
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_GET_ADMIN,
  title: "Admin list",
  columns,
  updateEndpoint: ENDPOINT_POST_PUT_ADMIN,
  deleteEndpoint: ENDPOINT_POST_PUT_ADMIN,
  getRoles: true,
  createFields: [
    new Filter({
      key: "email",
      type: "input",
      text: "Email",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "role",
      type: "select",
      text: "Select role",
      col: 12,
      selectName: "Roles",
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "email",
      type: "input",
      text: "Email",
      col: 12,
      require: true,
      disabled: true,
    }),
    new Filter({
      key: "role",
      type: "select",
      text: "Select role",
      selectName: "Roles",
      col: 12,
      require: true,
    }),
  ],
});
