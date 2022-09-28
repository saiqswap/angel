import { Box, Typography } from "@material-ui/core";
import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  ENDPOINT_MINTING_BOX_PUSH_SOLD_CREATE,
  ENDPOINT_MINTING_BOX_PUSH_SOLD_GET_LIST,
  ENDPOINT_MINTING_BOX_PUSH_SOLD_UPDATE,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "id",
    label: "",
    isId: true,
  },
  {
    key: "productId",
    label: "Box ID",
  },
  {
    key: "comboId",
    label: "Combo ID",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "max",
    label: "Maximum",
  },
];

export default SearchHigherComponent({
  endpoint: ENDPOINT_MINTING_BOX_PUSH_SOLD_GET_LIST,
  title: "Minting Box Sold Job",
  columns,
  updateEndpoint: ENDPOINT_MINTING_BOX_PUSH_SOLD_UPDATE,
  deleteEndpoint: ENDPOINT_MINTING_BOX_PUSH_SOLD_CREATE,
  createEndpoint: ENDPOINT_MINTING_BOX_PUSH_SOLD_CREATE,
  component: "MINTING_BOX_PUSH_SOLD",
  NoticeComponent: () => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="error" style={{ fontWeight: 900 }}>
        Notice (**10 seconds **1 task run.)
      </Typography>
      <Typography variant="body2">Amount: amount each time run</Typography>
      <Typography variant="body2">
        Max: Max value of running job. Each time run max value must decrease
      </Typography>
    </Box>
  ),
  getRoles: true,
  createFields: [
    new Filter({
      key: "productId",
      type: "input",
      text: "Box ID",
      col: 12,
      //   require: true,
    }),
    new Filter({
      key: "comboId",
      type: "input",
      text: "Combo ID",
      col: 12,
      //   require: true,
    }),
    new Filter({
      key: "amount",
      type: "input",
      text: "Amount",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "max",
      type: "input",
      text: "Maximum",
      col: 12,
      require: true,
    }),
  ],
  updateFields: [
    new Filter({
      key: "productId",
      type: "input",
      text: "Box ID",
      col: 12,
    }),
    new Filter({
      key: "comboId",
      type: "input",
      text: "Combo ID",
      col: 12,
    }),
    new Filter({
      key: "amount",
      type: "input",
      text: "Amount",
      col: 12,
      require: true,
    }),
    new Filter({
      key: "max",
      type: "input",
      text: "Maximum",
      col: 12,
      require: true,
    }),
  ],
});
