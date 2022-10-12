import { Box, Typography } from "@material-ui/core";
import SearchHigherComponent from "../../components/SearchHigherComponent";
import { ENDPOINT_BOX_LIST } from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "tokenId",
    label: "Token ID",
    isId: true,
  },
  {
    key: "userId",
    label: "User ID",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "type",
    label: "Box Type",
  },
  {
    key: "inDb",
    label: "In Database",
    isUsed: true,
  },
  {
    key: "isUsed",
    label: "Used",
    isUsed: true,
  },
  {
    key: "txHash",
    label: "TX Hash",
    isAddress: true,
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "userId",
    text: "User ID",
    type: "input",
  }),
  new Filter({
    key: "txHash",
    text: "TX Hash",
    type: "input",
  }),
  new Filter({
    key: "productId",
    text: "Product ID",
    type: "input",
  }),
  new Filter({
    key: "status",
    text: "Status",
    type: "select",
    selectName: "PresaleTransactionStatus",
  }),
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_BOX_LIST,
  title: "Box List",
  columns,
  getRoles: true,
  filterBy,
  NoticeComponent: () => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="error" style={{ fontWeight: 900 }}>
        In database is box cannot mint, listing, delist, transfer, buy
      </Typography>
    </Box>
  ),
});
