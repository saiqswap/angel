import SearchHigherComponent from "../../components/SearchHigherComponent";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "ID",
    isFeedToken: true,
  },
  {
    key: "class",
    label: "Class",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "gameId",
    label: "Game ID",
  },
  {
    key: "level",
    label: "Level",
  },
  {
    key: "rank",
    label: "Rank",
  },
  {
    key: "angelLevel",
    label: "Angle level",
  },
  {
    key: "createTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "class",
    type: "input",
    text: "Class",
  }),
  new Filter({
    key: "name",
    type: "input",
    text: "Name",
  }),
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "EQUIPMENT_TYPE",
  }),
];

export default SearchHigherComponent({
  endpoint: `/adm-api/v1/config/equipment/list`,
  updateEndpoint: `/adm-api/v1/config/equipment`,
  createFields: [
    new Filter({
      key: "class",
      text: "Class",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "name",
      text: "Name",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "type",
      text: "Type",
      type: "select",
      require: true,
      col: 12,
      selectName: "EQUIPMENT_TYPE",
    }),
    new Filter({
      key: "gameId",
      text: "Game ID",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "level",
      text: "Level",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "rank",
      text: "Rank",
      type: "select",
      require: true,
      col: 12,
      selectName: "EQUIPMENT_RANK",
    }),
    new Filter({
      key: "angelLevel",
      text: "Angel level",
      type: "input",
      require: true,
      col: 12,
    }),
  ],
  updateFields: [
    new Filter({
      key: "class",
      text: "Class",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "name",
      text: "Name",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "type",
      text: "Type",
      type: "select",
      require: true,
      col: 12,
      selectName: "EQUIPMENT_TYPE",
    }),
    new Filter({
      key: "gameId",
      text: "Game ID",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "level",
      text: "Level",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "rank",
      text: "Rank",
      type: "select",
      require: true,
      col: 12,
      selectName: "EQUIPMENT_RANK",
    }),
    new Filter({
      key: "angelLevel",
      text: "Angel level",
      type: "input",
      require: true,
      col: 12,
    }),
  ],
  deleteEndpoint: `/adm-api/v1/config/equipment`,
  title: "Equipment",
  columns,
  filterBy,
});
