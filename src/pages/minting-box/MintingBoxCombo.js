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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _getMintingBoxes } from "../../actions/adminActions";
import ItemDetail from "../../components/ItemDetail";
import ItemField from "../../components/ItemField";
import {
  ENDPOINT_MINTING_BOX_COMBO,
  ENDPOINT_MINTING_BOX_COMBO_LIST,
} from "../../constants/endpoint";
import { Filter } from "../../settings";
import { post, put } from "../../utils/api";

const columns = [
  {
    key: "location",
    label: "Location",
  },
  {
    key: "roundNumber",
    label: "Round",
  },
  {
    key: "comboType",
    label: "Combo type",
  },
  {
    key: "name",
    label: "Name",
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
    format: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    key: "endTime",
    label: "End",
    format: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    key: "isActive",
    label: "Status",
    format: (value) =>
      value ? (
        <span className="text-green">ACTIVE</span>
      ) : (
        <span className="text-red">INACTIVE</span>
      ),
  },
];

const createFields = [
  new Filter({
    key: "roundNumber",
    type: "select",
    text: "Round",
    col: 12,
    require: true,
    selectName: "MINTING_ROUND",
  }),
  new Filter({
    key: "comboType",
    type: "select",
    text: "Combo type",
    selectName: "COMBO_TYPE",
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
    type: "select",
    text: "Location",
    col: 12,
    require: true,
    selectName: "LOCATION",
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
    key: "sold",
    type: "input",
    text: "Sold",
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getMintingBoxes());
  }, [dispatch]);

  useEffect(() => {
    post(ENDPOINT_MINTING_BOX_COMBO_LIST, {}, (data) => setData(data.items));
  }, [flag]);

  const _handleRefresh = () => {
    console.log("xxxx", flag);
    setFlag(!flag);
  };

  const _onClose = () => setCreating(false);
  const _onOpen = () => setCreating(true);

  return (
    <>
      <Box>
        <Typography variant="h5">Minting Combos Box</Typography>
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
                        <TableCell key={index}>
                          {col.format
                            ? col.format(item[col.key])
                            : item[col.key]}
                        </TableCell>
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
        _handleRefresh={_handleRefresh}
      />
      <UpdateComponent
        data={updatingItem}
        _onClose={() => setUpdatingItem(null)}
        _handleRefresh={_handleRefresh}
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
  const [roundNumber, setRoundNumber] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    return () => setSelectedBoxList([]);
  }, []);

  useEffect(() => {
    let tempBoxList = null;
    if (paymentContract && mintingBoxes) {
      tempBoxList = mintingBoxes.filter(
        (box) =>
          box.paymentContract === paymentContract &&
          box.roundNumber === roundNumber &&
          box.location === location
      );
    }
    setBoxList(tempBoxList);
  }, [location, mintingBoxes, paymentContract, roundNumber]);

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
                <ItemField
                  data={field}
                  key={index}
                  onChange={(e) => {
                    if (field.key === "roundNumber") {
                      setRoundNumber(e.target.value);
                    }
                    if (field.key === "location") {
                      setLocation(e.target.value);
                    }
                    return null;
                  }}
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
                        sx={{
                          alignItems: "",
                        }}
                        label={
                          <Box>
                            <Box>
                              {`${box.boxType} - Location: ${box.location} -
                              Round ${box.roundNumber}`}
                            </Box>
                            <Box>
                              {`Price ${box.unitPrice} -
                              ${box.paymentCurrency}`}
                            </Box>
                          </Box>
                        }
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
  const [roundNumber, setRoundNumber] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    return () => setSelectedBoxList([]);
  }, []);

  useEffect(() => {
    if (data) {
      setPaymentContract(data.paymentContract);
      setRoundNumber(data.roundNumber);
      setLocation(data.location);
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
        (box) =>
          box.paymentContract === paymentContract &&
          box.roundNumber === roundNumber &&
          box.location === location
      );
    }
    setBoxList(tempBoxList);
  }, [location, mintingBoxes, paymentContract, roundNumber]);

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
                    onChange={(e) => {
                      if (field.key === "roundNumber") {
                        setRoundNumber(e.target.value);
                      }
                      if (field.key === "location") {
                        setLocation(e.target.value);
                      }
                      return null;
                    }}
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
