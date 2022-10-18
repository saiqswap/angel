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
import { Add, CheckCircle, Delete, Visibility } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DetailsIcon from "@material-ui/icons/Details";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import CustomPagination from "../../components/CustomPagination";
import ItemDetail from "../../components/ItemDetail";
import ItemField from "../../components/ItemField";
import {
  ENDPOINT_INO_CREATE_TRANSFER,
  ENDPOINT_INO_LIST,
} from "../../constants/endpoint";
import { formatAddress } from "../../settings/format";
import { post } from "../../utils/api";

export default function AirdropBox() {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [showBoxList, setShowBoxList] = useState(null);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exportData, setExportData] = useState(null);

  useEffect(() => {
    post(
      ENDPOINT_INO_LIST,
      {
        pageSize,
        page,
      },
      (data) => setData(data)
    );
  }, [flag, page, pageSize]);

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
            setLoading(true);
            const address = e.target.address.value;
            const name = e.target.name.value;
            const paymentContract = e.target.paymentContract.value;
            const inDb = e.target.inDb.checked;
            const tempItems = items.filter((e) => e.amount > 0);
            if (tempItems.length === 0) {
              toast.error("Please enter amount of box");
            } else {
              setOpen(false);
              post(
                ENDPOINT_INO_CREATE_TRANSFER,
                { address, name, paymentContract, inDb, items: tempItems },
                () => {
                  toast.success("Success");
                  _handleRefresh();
                  setLoading(false);
                },
                (error) => {
                  console.log(error);
                  toast.error("Fail");
                  setLoading(false);
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

  const _handleChangePageSize = (pageSize) => {
    setPageSize(pageSize);
    setPage(1);
  };

  const _handleChangePage = (page) => {
    setPage(page);
  };

  const _handleExport = async () => {
    // let list = [];
    let data = [];
    const pageCount = await new Promise((resolve) => {
      post(
        `${ENDPOINT_INO_LIST}`,
        {
          page: 1,
          pageSize: 1000,
        },
        (data) => {
          resolve(data.pageCount);
        },
        (error) => resolve(error)
      );
    });
    for (let index = 1; index <= pageCount; index++) {
      const items = await new Promise((resolve) => {
        post(
          `${ENDPOINT_INO_LIST}`,
          {
            page: index,
            pageSize: 1000,
          },
          (data) => {
            resolve(data.items);
          },
          (error) => resolve(error)
        );
      });
      data = [...data, ...items];
    }
    // for (const element of data) {
    //   const { items, address, inDb, name, createdTime } = element;
    //   for (const item of items) {
    //     list.push({
    //       ownerAddress: address,
    //       name,
    //       inDb: inDb ? "Yes" : "No",
    //       time: moment(createdTime).format("YYYY-MM-DD HH:mm:ss"),
    //       type: item.boxType,
    //       amount: 1,
    //       boxTokenId: "#" + item.boxTokenId,
    //       level: item.box.airdropNftLevel,
    //       hash: item.box.mintTxHash,
    //     });
    //   }
    // }
    setExportData(data);
  };

  return (
    <>
      <Box>
        <Typography variant="h5">Airdrop Box List</Typography>
        <Divider />
        <Box mt={2} mb={2}>
          <Button
            variant="contained"
            style={{ marginRight: 8 }}
            onClick={_onOpen}
            color="primary"
          >
            Create
          </Button>
          <Button
            variant="contained"
            onClick={_handleRefresh}
            style={{ marginRight: 8 }}
          >
            Refresh
          </Button>
          <Button type="submit" variant="contained" onClick={_handleExport}>
            Export
          </Button>
          {exportData && (
            <>
              <CSVLink
                data={exportData}
                headers={[
                  { label: "Owner Address", key: "ownerAddress" },
                  { label: "Name", key: "name" },
                  { label: "In DB", key: "inDb" },
                  { label: "Time", key: "time" },
                  { label: "Type", key: "type" },
                  { label: "Amount", key: "amount" },
                  { label: "Box ID", key: "boxTokenId" },
                  { label: "Level", key: "level" },
                  { label: "Hash", key: "hash" },
                ]}
                //   hidden
                id="export-btn"
                filename={`export-airdrop-box-${moment().format(
                  "YYYY-MM-DD_hh-mm-ss"
                )}.csv`}
              >
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: 8 }}
                >
                  Download
                </Button>
              </CSVLink>
            </>
          )}
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
                  <TableCell>In database</TableCell>
                  <TableCell>Created time</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.items?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>#{item.id}</TableCell>
                      <TableCell>{formatAddress(item.address)}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.inDb ? (
                          <CheckCircle color="primary" fontSize="small" />
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => setShowBoxList(item.items)}
                          size="small"
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
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
            <CustomPagination
              data={data}
              changePageSize={_handleChangePageSize}
              changePage={_handleChangePage}
            />
          </TableContainer>
        </Paper>
      </Box>
      <Drawer anchor="right" open={open} onClose={_onClose}>
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
                <ItemField
                  data={{
                    key: "inDb",
                    type: "singleCheckbox",
                    text: "In database",
                    col: 12,
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
      <Drawer
        anchor="right"
        open={Boolean(showBoxList)}
        onClose={() => setShowBoxList(null)}
      >
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
      <ItemDetail data={selectedItem} _onClose={() => setSelectedItem(null)} />
    </>
  );
}
