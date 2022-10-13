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
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DetailsIcon from "@material-ui/icons/Details";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import CreateAirdropToken from "../../components/aidrop-token/CreateAirdropToken";
import CustomPagination from "../../components/CustomPagination";
import ItemDetail from "../../components/ItemDetail";
import { EndPointConstant } from "../../constants/endpoint";
import { formatAddress, formatNumber } from "../../settings/format";
import { post } from "../../utils/api";

export default function AirdropToken() {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBoxList, setShowBoxList] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exportData, setExportData] = useState(null);

  useEffect(() => {
    post(
      EndPointConstant.INO_AIRDROP_TOKEN_GET_LIST,
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

  const _handleChangePageSize = (pageSize) => {
    setPageSize(pageSize);
    setPage(1);
  };

  const _handleChangePage = (page) => {
    setPage(page);
  };

  const _handleExport = () => {
    post(
      `${EndPointConstant.INO_AIRDROP_TOKEN_GET_LIST}`,
      {
        page: 1,
        pageSize: 10000,
      },
      (res) => {
        const list = [];
        const data = res.items;
        for (const element of data) {
          const { amount, address, asset, createdTime } = element;
          list.push({
            address,
            asset,
            time: moment(createdTime).format("YYYY-MM-DD HH:mm:ss"),
            amount,
          });
        }
        setExportData(list);
      }
    );
  };

  return (
    <>
      <Box>
        <Typography variant="h5">Airdrop Token List</Typography>
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
                  { label: "address", key: "address" },
                  { label: "amount", key: "amount" },
                  { label: "asset", key: "asset" },
                  { label: "time", key: "time" },
                ]}
                //   hidden
                id="export-btn"
                filename={`export-airdrop-token-${moment().format(
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
                  <TableCell>Amount</TableCell>
                  <TableCell>Asset</TableCell>
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
                      <TableCell>{formatNumber(item.amount)}</TableCell>
                      <TableCell>{item.asset}</TableCell>
                      <TableCell>
                        {moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
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
            <CustomPagination
              data={data}
              changePageSize={_handleChangePageSize}
              changePage={_handleChangePage}
            />
          </TableContainer>
        </Paper>
      </Box>
      <CreateAirdropToken
        open={open}
        _onClose={_onClose}
        loading={loading}
        _handleRefresh={_handleRefresh}
      />
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
