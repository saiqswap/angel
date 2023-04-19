import SearchHigherComponent from "../../components/SearchHigherComponent";
import { API_EXTENSION, Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
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
    key: "basePrice",
    label: "Price",
    isAmount: true,
  },
  {
    key: "percentage",
    label: "Percentage",
    isAmount: true,
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },
  {
    key: "createdTime",
    label: "Created time",
    isTime: true,
  },
  {
    key: "updatedTime",
    label: "Updated time",
    isTime: true,
  },
];

export default SearchHigherComponent({
  endpoint: `${API_EXTENSION}/v1/swap-nft-to-ing-lock/list`,
  title: "Swap NTF items to ING config",
  columns,
  createEndpoint: `${API_EXTENSION}/v1/swap-nft-to-ing-lock/create`,
  updateEndpoint: `${API_EXTENSION}/v1/swap-nft-to-ing-lock/update`,
  getRoles: true,
  createFields: [
    new Filter({
      key: "nftType",
      type: "select",
      text: "NFT Type",
      col: 12,
      require: true,
      selectName: "NFT_TYPES",
    }),
    new Filter({
      key: "nftLevel",
      type: "select",
      text: "NFT Level",
      col: 12,
      require: true,
      selectName: "GAME_TYPE_LEVEL",
    }),
    new Filter({
      key: "basePrice",
      type: "input",
      text: "Floor price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "percentage",
      type: "input",
      text: "Percent",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "isActive",
      type: "singleCheckbox",
      text: "Active",
      col: 12,
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "nftType",
      type: "select",
      text: "NFT Type",
      col: 12,
      require: true,
      selectName: "NFT_TYPES",
    }),
    new Filter({
      key: "nftLevel",
      type: "select",
      text: "NFT Level",
      col: 12,
      require: true,
      selectName: "GAME_TYPE_LEVEL",
    }),
    new Filter({
      key: "basePrice",
      type: "input",
      text: "Floor price",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "percentage",
      type: "input",
      text: "Percent",
      require: true,
      col: 12,
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
