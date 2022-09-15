import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_CONFIG_RI,
  ENDPOINT_CONFIG_RI_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "nftType",
    label: "Type",
  },
  {
    key: "nftLevel",
    label: "Level",
  },
  {
    key: "minPerformance",
    label: "Min Performance",
    isAmount: true,
  },
  {
    key: "maxPerformance",
    label: "Max Performance",
    isAmount: true,
  },
  {
    key: "time",
    label: "Time",
    isAmount: true,
  },
  {
    key: "timeBonus",
    label: "Time Bonus",
    isAmount: true,
  },
  {
    key: "performanceBonus",
    label: "Performance Bonus",
    isAmount: true,
  },
  {
    key: "createdTime",
    label: "Created Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "nftType",
    type: "select",
    text: "Type",
    selectName: "GAME_ITEM_TYPE",
  }),
  new Filter({
    key: "nftLevel",
    type: "select",
    text: "Level",
    selectName: "GAME_TYPE_LEVEL",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_CONFIG_RI_LIST,
  updateEndpoint: ENDPOINT_CONFIG_RI,
  createFields: [
    new Filter({
      key: "nftType",
      type: "select",
      text: "Type",
      selectName: "GAME_ITEM_TYPE",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "nftLevel",
      type: "select",
      text: "Level",
      selectName: "GAME_TYPE_LEVEL",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "minPerformance",
      text: "Min Performance",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "maxPerformance",
      text: "Max Performance",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "time",
      text: "Time",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "timeBonus",
      text: "Time Bonus",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "performanceBonus",
      text: "Performance Bonus",
      type: "input",
      col: 12,
    }),
  ],
  updateFields: [
    new Filter({
      key: "nftType",
      type: "select",
      text: "Type",
      selectName: "GAME_ITEM_TYPE",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "nftLevel",
      type: "select",
      text: "Level",
      selectName: "GAME_TYPE_LEVEL",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "minPerformance",
      text: "Min Performance",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "maxPerformance",
      text: "Max Performance",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "time",
      text: "Time",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "timeBonus",
      text: "Time Bonus",
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "performanceBonus",
      text: "Performance Bonus",
      type: "input",
      col: 12,
    }),
  ],
  deleteEndpoint: ENDPOINT_CONFIG_RI,
  title: "RI",
  columns,
  filterBy,
});
