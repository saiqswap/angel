import { Box, Typography } from "@material-ui/core";
import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_NFT_GET_LIST } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "fileUri",
    isNFTImage: true,
  },
  {
    key: "tokenId",
    label: "ID",
    isId: true,
  },
  {
    key: "ownerAddress",
    label: "Owner address",
    isOwnerAddress: true,
    userId: "userId",
  },
  {
    key: "box",
    label: "Box",
    isBoxDetail: true,
  },
  {
    key: "inDb",
    label: "In Database",
    isUsed: true,
  },
  {
    key: "isLockMinting",
    label: "Lock minting",
    isUsed: true,
  },
  {
    key: "status",
    label: "Status",
    // isStatus: true,
  },
  {
    key: "mintTxHash",
    label: "Mint Tx Hash",
    isAddress: true,
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
    key: "level",
    label: "Level",
  },
  {
    key: "listingPrice",
    label: "Price",
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

export default function NFTs(props) {
  const Component = new SearchHigherComponent({
    ...props,
    endpoint: ENDPOINT_NFT_GET_LIST,
    title: "NFTs",
    columns,
    filterBy,
    note: "ownerAddress",
    NoticeComponent: () => (
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="error" style={{ fontWeight: 900 }}>
          In database is item cannot mint, listing, delist, transfer, buy
        </Typography>
      </Box>
    ),
  });
  return <Component />;
}
