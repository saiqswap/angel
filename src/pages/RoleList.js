import SearchHigherComponent from "../components/SearchHigherComponent";
import {
  ENDPOINT_GET_ROLE,
  ENDPOINT_POST_PUT_ROLE,
} from "../constants/endpoint";
import { Filter } from "../settings";

const columns = [
  {
    key: "name",
    label: "Role",
  },
  {
    key: "scopes",
    label: "Scopes",
    isArray: true,
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_GET_ROLE,
  // exportLink: "/user-service/user/export",
  title: "Role list",
  columns,
  updateEndpoint: ENDPOINT_POST_PUT_ROLE,
  getRoles: true,
  createFields: [
    new Filter({
      key: "name",
      text: "Role name",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "scopes",
      text: "Choose scopes",
      type: "checkbox",
      selectName: "Scopes",
    }),
  ],
  updateFields: [
    new Filter({
      key: "name",
      text: "Role name",
      type: "input",
      require: true,
      col: 12,
      disabled: true,
    }),
    new Filter({
      key: "scopes",
      text: "Choose scopes",
      type: "checkbox",
      selectName: "Scopes",
    }),
  ],
});
