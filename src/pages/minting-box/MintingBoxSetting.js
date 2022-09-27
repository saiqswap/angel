import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_MINTING_BOX_SETTING_CREATE,
  ENDPOINT_MINTING_BOX_SETTING_GET_LIST,
  ENDPOINT_MINTING_BOX_SETTING_UPDATE,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "location",
    label: "Location",
  },
  {
    key: "roundNumber",
    label: "Round",
  },
  {
    key: "boxes",
    label: "Boxex",
  },

  {
    key: "combos",
    label: "Combos",
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_MINTING_BOX_SETTING_GET_LIST,
  title: "Minting Box Settings",
  columns,
  updateEndpoint: ENDPOINT_MINTING_BOX_SETTING_UPDATE,
  createEndpoint: ENDPOINT_MINTING_BOX_SETTING_CREATE,
  getRoles: true,
  createFields: [
    new Filter({
      key: "roundNumber",
      type: "select",
      text: "Round",
      col: 12,
      require: true,
      selectName: "MINTING_ROUND",
    }),
    new Filter({
      key: "location",
      type: "select",
      text: "Location",
      col: 12,
      require: true,
      selectName: "LOCATION",
    }),
    new Filter({
      key: "boxes",
      type: "input",
      text: "Boxes",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "combos",
      type: "input",
      text: "Combos",
      col: 12,
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "roundNumber",
      type: "select",
      text: "Round",
      col: 12,
      require: true,
      selectName: "MINTING_ROUND",
    }),
    new Filter({
      key: "location",
      type: "select",
      text: "Location",
      col: 12,
      require: true,
      selectName: "LOCATION",
    }),
    new Filter({
      key: "boxes",
      type: "input",
      text: "Boxes",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "combos",
      type: "input",
      text: "Combos",
      col: 12,
      require: true,
    }),
  ],
});
