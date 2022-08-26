import SearchHigherComponent from "../components/SearchHigherComponent";
import { Filter } from "../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "price",
    label: "Price",
    isAmount: true,
  },
  {
    key: "available",
    label: "Available",
    isAmount: true,
  },
  {
    key: "paymentContract",
    label: "Payment Contract",
    isAddress: true,
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },
];

export default SearchHigherComponent({
  endpoint: `/api/v1/config/system-box/list`,
  title: "Box list",
  columns,
  updateEndpoint: `/api/v1/config/system-box`,
  //   deleteEndpoint: `/api/v1/config/contract`,
  getRoles: true,
  //   createFields: [
  //     new Filter({
  //       key: "type",
  //       type: "input",
  //       text: "Type",
  //       col: 12,
  //       require: true,
  //     }),
  //     new Filter({
  //       key: "paymentContract",
  //       type: "input",
  //       text: "Payment Contract",
  //       col: 12,
  //       require: true,
  //     }),
  //     new Filter({
  //       key: "price",
  //       type: "input",
  //       text: "Price",
  //       col: 12,
  //       require: true,
  //     }),
  //     new Filter({
  //       key: "available",
  //       type: "input",
  //       text: "Available",
  //       col: 12,
  //       require: true,
  //     }),
  //   ],
  updateFields: [
    new Filter({
      key: "type",
      type: "input",
      text: "Type",
      col: 12,
      require: true,
      disabled: true,
    }),
    new Filter({
      key: "paymentContract",
      type: "input",
      text: "Payment Contract",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "price",
      type: "input",
      text: "Price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "available",
      type: "input",
      text: "Available",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "isActive",
      type: "singleCheckbox",
      text: "Active",
      col: 12,
      require: true,
    }),
  ],
});
