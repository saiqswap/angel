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
    key: "account",
    type: "input",
    text: "Owner",
  }),
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "GAME_ITEM_TYPE",
  }),
];

export default SearchHigherComponent({
  endpoint: `/api/v1/nft/get-list`,
  title: "NFTs",
  columns,
  filterBy,
  reMintEndpoint: `/api/v1/nft/mint`,
  component: "nfts",
});
