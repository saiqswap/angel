import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
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
import { Add, Delete, Visibility } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import ItemField from "../../components/ItemField";
import {
  ENDPOINT_INO_CREATE_TRANSFER,
  ENDPOINT_INO_LIST,
} from "../../constants/endpoint";
import { formatAddress } from "../../settings/format";
import { post } from "../../utils/api";

export default function INOList() {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [showBoxList, setShowBoxList] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    post(ENDPOINT_INO_LIST, {}, (data) => setData(data.items));
  }, [flag]);

  const _handleRefresh = () => {
    setFlag((oldFlag) => !oldFlag);
  };

  const _onClose = () => setOpen(false);
  const _onOpen = () => setOpen(true);

  const _handleCreate = (e) => {
    e.preventDefault();
    if (items.length > 0) {
      dispatch(
        _switchPopup({
          title: "Send Box NFT",
          content: "Are you for this action",
          _handleSubmit: () => {
            const address = e.target.address.value;
            const name = e.target.name.value;
            const paymentContract = e.target.paymentContract.value;
            const tempItems = items.filter((e) => e.amount > 0);
            if (tempItems.length === 0) {
              toast.error("Please enter amount of box");
            } else {
              setOpen(false);
              post(
                ENDPOINT_INO_CREATE_TRANSFER,
                { address, name, paymentContract, items: tempItems },
                () => {
                  toast.success("Success");
                  _handleRefresh();
                },
                (error) => {
                  console.log(error);
                  toast.error("Fail");
                }
              );
            }
          },
        })
      );
    } else {
      toast.error("Please select box for send airdrop");
    }
  };

  const _onChange = (e, index) => {
    const { name, value } = e.target;
    const tempItems = [...items];
    if (name === "amount") {
      tempItems[index].amount = parseInt(value) ? parseInt(value) : 0;
    } else if (name === "level") {
      tempItems[index].level = value ? value : null;
    } else {
      tempItems[index][name] = value;
    }
    setItems(tempItems);
  };

  // const _handleSend = (id) => {
  //   var answer = window.confirm("Are you sure ?");
  //   if (answer) {
  //     const tempData = [...data];
  //     const index = tempData.findIndex((d) => d.id === id);
  //     if (index > 0) tempData[index].clicked = true;
  //     setData(tempData);
  //     post(
  //       ENDPOINT_INO_SEND_TRANSFER,
  //       { id },
  //       () => {
  //         toast.success("Success");
  //         // _handleRefresh();
  //       },
  //       (error) => {
  //         const tempData = [...data];
  //         const index = tempData.findIndex((d) => d.id === id);
  //         if (index > 0) tempData[index].clicked = false;
  //         setData(tempData);
  //         toast.error(`${error.code}:  ${error.msg}`);
  //       }
  //     );
  //   }
  // };

  const _addSlot = () => {
    const temp = [...items];
    temp.push({
      boxType: "",
      amount: 0,
      level: null,
      price: 100,
    });
    setItems(temp);
  };

  const _handleDelete = (index) => {
    const temp = [...items];
    if (index > -1) {
      temp.splice(index, 1);
    }
    setItems(temp);
  };

  return (
    <>
      <Box>
        <Typography variant="h5">INO Box List</Typography>
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
                  <TableCell>ID</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Boxes</TableCell>
                  <TableCell>Minted/Total</TableCell>
                  <TableCell>Sended/Total</TableCell>
                  <TableCell>Created time</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => {
                  let mintCount = 0;
                  let sendedCount = 0;
                  item.items.forEach((e) => {
                    if (e.box.mintTxHash) {
                      mintCount++;
                    }
                    if (
                      e.box.ownerAddress.toUpperCase() ===
                      item.address.toUpperCase()
                    ) {
                      sendedCount++;
                    }
                  });
                  return (
                    <TableRow key={index}>
                      <TableCell>#{item.id}</TableCell>
                      <TableCell>{formatAddress(item.address)}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {[
                          `ANGEL`,
                          `MINION_PARTS_COMMON`,
                          `MINION_PARTS_EPIC`,
                          `COSTUME_COMMON`,
                          `COSTUME_EPIC`,
                        ].map((i, index) => {
                          const { items } = item;
                          const count = items.filter((i1) => i1.boxType === i);
                          return (
                            count.length > 0 && (
                              <Typography variant="body2" key={index}>
                                {i}: {count.length}
                              </Typography>
                            )
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {mintCount}/{item.items.length}
                      </TableCell>
                      <TableCell>
                        {sendedCount}/{item.items.length}
                      </TableCell>
                      <TableCell>
                        {moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        {/* {mintCount > 0 &&
                          mintCount === item.items.length &&
                          sendedCount === 0 && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => _handleSend(item.id)}
                              disabled={item.clicked}
                            >
                              Send
                            </Button>
                          )} */}
                        <IconButton onClick={() => setShowBoxList(item.items)}>
                          <Visibility />
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
                <ItemField
                  data={{
                    key: "address",
                    type: "input",
                    col: 12,
                    text: "Address",
                    require: true,
                  }}
                />
                <ItemField
                  data={{
                    key: "name",
                    type: "input",
                    col: 12,
                    text: "Name",
                    require: true,
                  }}
                />
                <ItemField
                  data={{
                    key: "paymentContract",
                    type: "SELECT_PAYMENT_CONTRACT",
                    col: 12,
                    text: "Payment contract",
                    selectName: "PAYMENT_CONTRACTS",
                    require: true,
                  }}
                />
                <Grid item xs={12}>
                  <Box
                    p={3}
                    border="1px solid rgba(0, 0, 0, 0.23)"
                    borderRadius={7}
                  >
                    {items.map((item, index) => (
                      <Box key={index} mb={2} alignItems="center">
                        <Grid container spacing={1} alignItems="center">
                          <ItemField
                            data={{
                              key: "boxType",
                              type: "select",
                              text: "Box",
                              selectName: "BOX_TYPES",
                              require: true,
                              col: 5,
                            }}
                            id="boxType"
                            onChange={(e) => _onChange(e, index)}
                          />
                          <ItemField
                            data={{
                              key: "level",
                              type: "select",
                              text: "Type",
                              selectName: "GAME_TYPE_LEVEL",
                              col: 4,
                            }}
                            id="level"
                            onChange={(e) => _onChange(e, index)}
                          />
                          <Grid item xs={2}>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Amount"
                              value={item.amount}
                              onChange={(e) => _onChange(e, index)}
                              name="amount"
                              required
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => {
                                _handleDelete(index);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    <Button variant="contained" onClick={_addSlot}>
                      <Add />
                    </Button>
                  </Box>
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
      <Drawer anchor="right" open={Boolean(showBoxList)}>
        <div className="item-detail">
          <div>
            <AppBar position="sticky">
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton
                    onClick={() => setShowBoxList(null)}
                    disabled={loading}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Back</Typography>
                </Grid>
              </Grid>
            </AppBar>
            <Box p={2}>
              <Typography>Box List</Typography>
              {showBoxList?.map((item, index) => (
                <Paper variant="outlined" key={index} style={{ marginTop: 8 }}>
                  <Box p={1}>
                    <Typography variant="body2">#{item.boxTokenId}</Typography>
                    <Typography variant="body2">
                      Type: {item.box.type}
                    </Typography>
                    <Typography variant="body2">
                      Level:{" "}
                      {item.box.airdropNftLevel
                        ? item.box.airdropNftLevel
                        : "Random"}
                    </Typography>
                    <Typography variant="body2">
                      Tx Hash: {item.box.mintTxHash}
                    </Typography>
                    <Typography variant="body2">
                      Owner: {item.box.ownerAddress}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </div>
        </div>
      </Drawer>
    </>
  );
}

// import SearchHigherComponent from "../../components/SearchHigherComponent";
// import { ENDPOINT_INO_LIST } from "../../constants/endpoint";
// import { Filter } from "../../settings";

// const columns = [
//   {
//     key: "id",
//     label: "",
//     isId: true,
//   },
//   {
//     key: "address",
//     label: "Address",
//     isAddress: true,
//   },
//   {
//     key: "name",
//     label: "Name",
//   },
//   {
//     key: "items",
//     label: "Quality (Boxes)",
//     isINOItems: true,
//   },
//   {
//     key: "paymentContract",
//     label: "Payment contract",
//     isAddress: true,
//   },
//   {
//     key: "createdTime",
//     label: "Created time",
//     isTime: true,
//   },
//   {
//     key: "updatedTime",
//     label: "Last updated",
//     isTime: true,
//   },
// ];

// const filterBy = [
//   new Filter({
//     key: "userId",
//     text: "User ID",
//     type: "input",
//   }),
//   new Filter({
//     key: "txHash",
//     text: "TX Hash",
//     type: "input",
//   }),
//   new Filter({
//     key: "productId",
//     text: "Product ID",
//     type: "input",
//   }),
//   new Filter({
//     key: "status",
//     text: "Status",
//     type: "select",
//     selectName: "PresaleTransactionStatus",
//   }),
// ];

// export default SearchHigherComponent({
//   endpoint: ENDPOINT_INO_LIST,
//   title: "INO Box List",
//   columns,
//   getRoles: true,
//   filterBy,
// });
