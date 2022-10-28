import { Box, Typography } from "@material-ui/core";
import SearchHigherComponent from "../../components/SearchHigherComponent";
import {
  EndPointConstant,
  ENDPOINT_CONTRACT,
  ENDPOINT_CONTRACT_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";

const columns = [
  {
    key: "minAngels",
    label: "Min Angels",
  },
  {
    key: "maxAngels",
    label: "Max Angels",
  },
  {
    key: "riBonusPercent",
    label: "Ri Bonus Percent",
  },
  {
    key: "isActive",
    label: "Active",
    isBool: true,
  },
  {
    key: "startTime",
    label: "Start Time",
    isTime: true,
  },
  {
    key: "endTime",
    label: "End Time",
    isTime: true,
  },
];

const createFields = [
  new Filter({
    key: "minAngels",
    type: "input",
    text: "Min Angels",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "maxAngels",
    type: "input",
    text: "Max Angels",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "startTime",
    type: "input",
    text: "Start Time",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "endTime",
    type: "input",
    text: "End Time",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "riBonusPercent",
    type: "input",
    text: "Ri Bonus Percent",
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
];

export default SearchHigherComponent({
  endpoint: EndPointConstant.RI_REWARD_GET_LIST,
  title: "R-I Reward Config",
  columns,
  createEndpoint: EndPointConstant.RI_REWARD,
  updateEndpoint: EndPointConstant.RI_REWARD,
  getRoles: true,
  createFields,
  updateFields: createFields,
  NoticeComponent: () => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="error" style={{ fontWeight: 900 }}>
        Notice: When user has from Min Angels to Max Angels, receive Reward
        bonus Ri Bonus Percent earn amount in R-I.
      </Typography>
    </Box>
  ),
});
