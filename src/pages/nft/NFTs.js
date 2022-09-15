import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_NFT_GET_LIST,
  ENDPOINT_NFT_MINT,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "fileUri",
    isImage: true,
  },
  {
    key: "tokenId",
    label: "ID",
    isId: true,
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
    key: "userId",
    label: "User ID",
    isEmail: true,
    userId: "userId",
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
  endpoint: ENDPOINT_NFT_GET_LIST,
  title: "NFTs",
  columns,
  filterBy,
  reMintEndpoint: ENDPOINT_NFT_MINT,
  component: "nfts",
});
