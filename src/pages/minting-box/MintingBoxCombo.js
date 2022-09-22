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
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DetailsIcon from "@material-ui/icons/Details";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ItemDetail from "../../components/ItemDetail";
import ItemField from "../../components/ItemField";
import {
  ENDPOINT_MINTING_BOX_COMBO,
  ENDPOINT_MINTING_BOX_COMBO_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";
import { post, put } from "../../utils/api";

const columns = [
  { key: "id", label: "", isId: true },
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
    key: "name",
    type: "input",
    text: "Name",
    col: 12,
    require: true,
  }),
  new Filter({
    key: "location",
    type: "input",
    text: "Location",
    col: 12,
    require: true,
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
  const [updatingItem, setUpdatingItem] = useState(null);
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
                        <IconButton
                          size="small"
                          onClick={() => setUpdatingItem(item)}
                        >
                          <Edit fontSize="small" />
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
      <CreateComponent
        open={creating}
        _onClose={_onClose}
        __handleRefresh={_handleRefresh}
      />
      <UpdateComponent
        data={updatingItem}
        _onClose={() => setUpdatingItem(null)}
        __handleRefresh={_handleRefresh}
      />
      <ItemDetail data={selectedItem} _onClose={() => setSelectedItem(null)} />
    </>
  );
}

const CreateComponent = ({ open, _onClose, _handleRefresh }) => {
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
    const body = {};
    createFields.map((item) => {
      if (item.type === "singleCheckbox") {
        body[item.key] = e.target[item.key].checked;
      } else {
        body[item.key] = e.target[item.key].value;
      }
      return null;
    });
    body.products = selectedBoxList;
    body.paymentContract = paymentContract;
    var answer = window.confirm("Are you sure ?");
    if (answer) {
      post(
        ENDPOINT_MINTING_BOX_COMBO,
        body,
        () => {
          _onClose();
          toast.success("Success");
          _handleRefresh();
        },
        (error) => {
          console.log(error);
          toast.error("Fail");
        }
      );
    }
    console.log(body);
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

const UpdateComponent = ({ data, _onClose, _handleRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [paymentContract, setPaymentContract] = useState(null);
  const { admin } = useSelector((state) => state);
  const { mintingBoxes } = admin;
  const [boxList, setBoxList] = useState(null);
  const [selectedBoxList, setSelectedBoxList] = useState([]);

  useEffect(() => {
    if (data) {
      setPaymentContract(data.paymentContract);
      const temp = [];
      data.products.forEach((product) => {
        temp.push({
          productId: product.product.id,
          unitPrice: 0,
        });
      });
      setSelectedBoxList(temp);
    }
  }, [data]);

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
    const body = {};
    body.id = data.id;
    createFields.map((item) => {
      if (item.type === "singleCheckbox") {
        body[item.key] = e.target[item.key].checked;
      } else {
        body[item.key] = e.target[item.key].value;
      }
      return null;
    });
    body.products = selectedBoxList;
    body.paymentContract = paymentContract;
    var answer = window.confirm("Are you sure ?");
    if (answer) {
      put(
        ENDPOINT_MINTING_BOX_COMBO,
        body,
        () => {
          _onClose();
          toast.success("Success");
          _handleRefresh();
        },
        (error) => {
          console.log(error);
          toast.error(error.code, error.msg);
        }
      );
    }
  };

  return (
    <Drawer anchor="right" open={data !== null}>
      <div className="item-detail">
        {data && (
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
                  <ItemField
                    data={field}
                    key={index}
                    defaultData={data[field.key]}
                  />
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
                  defaultData={paymentContract}
                />
                <Grid item xs={12}>
                  {boxList?.map((box, index) => {
                    let checked = selectedBoxList.findIndex(
                      (e) => e.productId === box.id
                    );
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
        )}
      </div>
    </Drawer>
  );
};
