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
} from "../../constants/endpoint";
import { formatAddress } from "../../settings/format";
import { post } from "../../utils/api";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ItemField from "../../components/ItemField";
import { toast } from "react-toastify";

export default function INOList() {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { boxType: "ANGEL", amount: 0, price: 100 },
    { boxType: "MINION_PARTS_COMMON", amount: 0, price: 100 },
    { boxType: "MINION_PARTS_EPIC", amount: 0, price: 100 },
    { boxType: "COSTUME_COMMON", amount: 0, price: 100 },
    { boxType: "COSTUME_EPIC", amount: 0, price: 100 },
  ]);

  useEffect(() => {
    post(ENDPOINT_INO_LIST, {}, (data) => setData(data));
  }, [flag]);

  const _handleRefresh = () => {
    setFlag((oldFlag) => !oldFlag);
  };

  const _onClose = () => setOpen(false);
  const _onOpen = () => setOpen(true);

  const _handleCreate = (e) => {
    e.preventDefault();

    const address = e.target.address.value;
    const name = e.target.name.value;
    const paymentContract = e.target.paymentContract.value;
    const tempItems = items.filter((e) => e.amount > 0);
    if (tempItems.length === 0) {
      toast.error("Please enter amount of box");
    } else {
      var answer = window.confirm("Are you sure ?");
      if (answer) {
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
    }
  };

  const _onChange = (e, index) => {
    const tempItems = [...items];
    tempItems[index].amount = parseInt(e.target.value)
      ? parseInt(e.target.value)
      : 0;
    setItems(tempItems);
  };

  const _handleSend = (id) => {
    var answer = window.confirm("Are you sure ?");
    if (answer) {
      post(ENDPOINT_INO_SEND_TRANSFER, { id }, () =>
        toast.success("Success", (error) => {
          toast.error(`${error.code}:  ${error.msg}`);
        })
      );
    }
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
              {data?.items.map((item, index) => {
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
                      {moment(data.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {mintCount > 0 &&
                        mintCount === item.items.length &&
                        sendedCount === 0 && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => _handleSend(item.id)}
                          >
                            Send
                          </Button>
                        )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        mb={2}
                        alignItems="center"
                      >
                        <Typography>{item.boxType}</Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          label="Amount"
                          value={item.amount}
                          onChange={(e) => _onChange(e, index)}
                        />
                      </Box>
                    ))}
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
