import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ENDPOINT_INO_CREATE_TRANSFER,
  ENDPOINT_INO_LIST,
  ENDPOINT_INO_SEND_TRANSFER,
  ENDPOINT_MINTING_BOX_COMBO_LIST,
} from "../../constants/endpoint";
import { formatAddress } from "../../settings/format";
import { post } from "../../utils/api";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ItemField from "../../components/ItemField";
import { toast } from "react-toastify";
import DetailsIcon from "@material-ui/icons/Details";
import ItemDetail from "../../components/ItemDetail";
import { useSelector } from "react-redux";
import { AddBox } from "@material-ui/icons";
import { Filter } from "../../settings";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "roundNumber",
    label: "Round",
  },
  {
    key: "unitPrice",
    label: "Price",
  },
  {
    key: "paymentCurrency",
    label: "Asset",
  },
  {
    key: "supply",
    label: "Total Sell",
    isAmount: true,
  },
  {
    key: "available",
    label: "Available",
    isAmount: true,
  },
  {
    key: "sold",
    label: "Sold",
    isAmount: true,
  },
  {
    key: "supply",
    label: "Total Sell",
    isAmount: true,
  },
  {
    key: "minOrder",
    label: "Min",
  },
  {
    key: "maxOrder",
    label: "Max",
  },
  {
    key: "startTime",
    label: "Start",
    // isTime: true,
  },
  {
    key: "endTime",
    label: "End",
    // isTime: true,
  },
  {
    key: "isActive",
    label: "Status",
    isBool: true,
  },
];

const createFields = [
  new Filter({
    key: "roundNumber",
    type: "input",
    text: "Round",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "boxType",
    type: "select",
    text: "Box Type",
    col: 12,
    require: true,
    selectName: "BOX_TYPES",
  }),
  new Filter({
    key: "unitPrice",
    type: "input",
    text: "Price",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "supply",
    type: "input",
    text: "Total Sell",
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
    key: "minOrder",
    type: "input",
    text: "Min",
    col: 6,
    require: true,
  }),
  new Filter({
    key: "maxOrder",
    type: "input",
    text: "Max",
    col: 6,
    require: true,
  }),
  new Filter({
    key: "paymentContract",
    type: "SELECT_PAYMENT_CONTRACT",
    text: "Asset",
    col: 12,
    require: true,
    selectName: "PAYMENT_CONTRACTS",
  }),
  new Filter({
    key: "startTime",
    type: "input",
    text: "Start",
    col: 6,
    require: true,
  }),
  new Filter({
    key: "endTime",
    type: "input",
    text: "End",
    col: 6,
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

export default function MintingBoxCombo() {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    post(ENDPOINT_MINTING_BOX_COMBO_LIST, {}, (data) => setData(data.items));
  }, [flag]);

  const _handleRefresh = () => {
    setFlag((oldFlag) => !oldFlag);
  };

  const _onClose = () => setCreating(false);
  const _onOpen = () => setCreating(true);

  return (
    <>
      <Box>
        <Typography variant="h5">Minting Combo Box</Typography>
        <Divider />
        <Box mt={2} mb={2}>
          <Button
            variant="contained"
            style={{ marginRight: 8 }}
            onClick={_onOpen}
          >
            Create
          </Button>
          <Button variant="contained" onClick={_handleRefresh}>
            Refresh
          </Button>
        </Box>
        <Paper variant="outlined">
          <TableContainer
            style={{
              whiteSpace: "nowrap",
              overflow: "auto",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map((col, index) => (
                    <TableCell key={index}>{col.label}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      {columns.map((col, index) => (
                        <TableCell key={index}>{item[col.key]}</TableCell>
                      ))}
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setSelectedItem(item)}
                        >
                          <DetailsIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <UpdateComponent open={creating} _onClose={_onClose} />
      <ItemDetail data={selectedItem} _onClose={() => setSelectedItem(null)} />
    </>
  );
}

const UpdateComponent = ({ open, _onClose }) => {
  const [loading, setLoading] = useState(false);
  const [paymentContract, setPaymentContract] = useState(null);
  const { admin } = useSelector((state) => state);
  const { mintingBoxes } = admin;
  const [boxList, setBoxList] = useState(null);
  const [selectedBoxList, setSelectedBoxList] = useState([]);

  useEffect(() => {
    let tempBoxList = null;
    if (paymentContract && mintingBoxes) {
      tempBoxList = mintingBoxes.filter(
        (box) => box.paymentContract === paymentContract
      );
    }
    setBoxList(tempBoxList);
  }, [mintingBoxes, paymentContract]);

  const _handleCheck = (e) => {
    const { value, checked } = e.target;
    setSelectedBoxList((oldList) => {
      let temp = [...oldList];
      if (checked) {
        temp.push({ productId: parseInt(value), unitPrice: 0 });
      } else {
        const index = temp.findIndex((i) => i.productId.toString() === value);
        temp.splice(index, 1);
      }
      return temp;
    });
  };

  const _handleCreate = (e) => {
    e.preventDefault();
    console.log(e);

    // const address = e.target.address.value;
    // const name = e.target.name.value;
    // const paymentContract = e.target.paymentContract.value;
    // const tempItems = items.filter((e) => e.amount > 0);
    // if (tempItems.length === 0) {
    //   toast.error("Please enter amount of box");
    // } else {
    //   var answer = window.confirm("Are you sure ?");
    //   if (answer) {
    //     setOpen(false);
    //     post(
    //       ENDPOINT_INO_CREATE_TRANSFER,
    //       { address, name, paymentContract, items: tempItems },
    //       () => {
    //         toast.success("Success");
    //         _handleRefresh();
    //       },
    //       (error) => {
    //         console.log(error);
    //         toast.error("Fail");
    //       }
    //     );
    //   }
    // }
  };
  return (
    <Drawer anchor="right" open={open}>
      <div className="item-detail">
        <div>
          <AppBar position="sticky">
            <Grid container alignItems="center">
              <Grid item>
                <IconButton onClick={_onClose} disabled={loading}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1">Back</Typography>
              </Grid>
            </Grid>
          </AppBar>
          <form style={{ padding: 16 }} onSubmit={_handleCreate}>
            <Grid container spacing={2}>
              {createFields.map((field, index) => (
                <ItemField data={field} key={index} />
              ))}
              <ItemField
                data={{
                  key: "paymentContract",
                  type: "SELECT_PAYMENT_CONTRACT",
                  col: 12,
                  text: "Payment contract",
                  selectName: "PAYMENT_CONTRACTS",
                  require: true,
                }}
                onChange={(e) => setPaymentContract(e.target.value)}
              />
              <Grid item xs={12}>
                {boxList?.map((box, index) => {
                  let checked = selectedBoxList.findIndex(
                    (e) => e.productId === box.id
                  );
                  console.log(checked);
                  checked = checked > -1 ? true : false;
                  return (
                    <Box key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={_handleCheck}
                            value={box.id}
                            size="small"
                            checked={checked}
                          />
                        }
                        label={`${box.boxType} - Round ${box.roundNumber} - Price ${box.unitPrice} ${box.paymentCurrency}`}
                      />
                    </Box>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Drawer>
  );
};
