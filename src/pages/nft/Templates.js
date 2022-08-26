import SearchHigherComponent from "../../components/SearchHigherComponent";
import { Filter } from "../../settings";

const columns = [
  {
    key: "fileUri",
    isImage: true,
  },
  {
    key: "tokenId",
    label: "ID",
    isFeedToken: true,
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
    key: "listingPrice",
    label: "Price",
    isAmount: true,
  },
  {
    key: "ownerAddress",
    label: "Owner address",
    isAddress: true,
  },
  {
    key: "status",
    label: "Status",
    // isStatus: true,
  },
  {
    key: "createTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "GAME_ITEM_TYPE",
  }),
];

export default SearchHigherComponent({
  endpoint: `/api/v1/nft/get-list`,
  title: "NFT Templates",
  columns,
  filterBy,
  updateEndpoint: `/api/v1/nft`,
  // deleteEndpoint: `/api/v1/nft`,
  createFields: [
    new Filter({
      key: "name",
      text: "Name",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "description",
      text: "Description",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "status",
      text: "Status",
      type: "select",
      selectName: "GAME_ITEM_STATUS",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "gameId",
      text: "Game ID",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "type",
      text: "Type",
      type: "select",
      selectName: "GAME_ITEM_TYPE",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "level",
      text: "Level",
      type: "select",
      require: true,
      selectName: "GAME_TYPE_LEVEL",
      col: 12,
    }),
    new Filter({
      key: "category",
      text: "Category",
      require: true,
      type: "input",
      col: 12,
    }),
    new Filter({
      key: "fileUri",
      text: "File URI",
      require: true,
      type: "file",
    }),
    new Filter({
      key: "properties",
      type: "properties",
      text: "Properties",
    }),
  ],
  updateFields: [
    new Filter({
      key: "tokenId",
      text: "Token ID",
      type: "input",
      disabled: true,
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
      key: "description",
      text: "Description",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "status",
      text: "Status",
      type: "select",
      selectName: "GAME_ITEM_STATUS",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "gameId",
      text: "Game ID",
      type: "input",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "type",
      text: "Type",
      type: "select",
      selectName: "GAME_ITEM_TYPE",
      require: true,
      col: 12,
    }),
    new Filter({
      key: "level",
      text: "Level",
      type: "select",
      require: true,
      selectName: "GAME_TYPE_LEVEL",
      col: 12,
    }),
    // new Filter({
    //   key: "category",
    //   text: "Category",
    //   require: true,
    //   type: "input",
    //   col: 12,
    // }),
    new Filter({
      key: "fileUri",
      text: "File URI",
      require: true,
      type: "file",
    }),
    new Filter({
      key: "properties",
      type: "properties",
      text: "Properties",
    }),
  ],
  component: "nfts",
  isNFTTemplate: true,
});
