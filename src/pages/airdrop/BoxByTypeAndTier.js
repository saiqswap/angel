import {
  Box,
  Button,
  Divider,
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
import { Cancel, CheckCircle, Delete } from "@material-ui/icons";
import TimerIcon from "@material-ui/icons/Timer";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BOX_LIST, TIER_LIST } from "../../constants";
import {
  ENDPOINT_AIRDROP_NORMAL_BOX,
  ENDPOINT_AIRDROP_SPECIAL_BOX,
} from "../../constants/endpoint";
import { _convertCsvToArray } from "../../settings/format";
import { post } from "../../utils/api";

export default function BoxByTypeAndTier() {
  const [list, setList] = useState([]);

  const _handleAddSlot = () => {
    const temp = [...list];
    temp.push({
      userAddress: "",
      boxType: "ANGEL",
      nftLevel: "TIER_1",
      amount: 1,
    });
    setList(temp);
  };

  const _handleChange = (index, field, address) => {
    const temp = [...list];
    temp[index][field] = address;
    setList(temp);
  };

  const _handleDelete = (index) => {
    const temp = [...list];
    if (index > -1) {
      temp.splice(index, 1);
    }
    setList(temp);
  };

  const _handleAirdrop = () => {
    post(
      ENDPOINT_AIRDROP_SPECIAL_BOX,
      list,
      () => {
        toast.success("Success");
      },
      (error) => {
        toast.error(`Error: ${error.code} - ${error.msg}`);
      }
    );
  };

  const _handleUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      let array = _convertCsvToArray(e.target.result);
      array = array.filter((item) => item.address !== "" && item);
      const temp = [...list, ...array];
      setList(temp);
    };
    reader.readAsText(file);
  };

  const _handleClear = () => setList([]);

  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Airdrop NFT Box With TIER</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <br />
          </Grid>
          {list.map((item, index) => (
            <UserDetail
              key={index}
              data={item}
              _handleChange={_handleChange}
              _handleDelete={_handleDelete}
              index={index}
            />
          ))}
        </Grid>
        {list.length === 0 && <Helper />}
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 80,
          right: "16px",
          width: "120px",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={_handleAddSlot}
          style={{ marginBottom: 16 }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          fullWidth
          component="label"
          color="primary"
          onChange={_handleUpload}
          style={{ marginBottom: 16 }}
        >
          Upload
          <input type="file" hidden />
        </Button>
        <Button
          variant="contained"
          fullWidth
          component="label"
          color="default"
          style={{ marginBottom: 16 }}
          onClick={_handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={_handleAirdrop}
          disabled={!list.length}
        >
          Airdrop
        </Button>
      </Box>
    </>
  );
}

const Helper = () => {
  return (
    <>
      <Typography>Example for File upload</Typography>
      <Paper variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>userAddress</TableCell>
              <TableCell>boxType</TableCell>
              <TableCell>nftLevel</TableCell>
              <TableCell>amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BOX_LIST.map((box, index) => (
              <TableRow>
                <TableCell>
                  0xF8A6a062344ac61420337c1c5b16635f87c29d38
                </TableCell>
                <TableCell>{box.value}</TableCell>
                <TableCell>{`TIER_${index + 1}`}</TableCell>
                <TableCell>{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

const UserDetail = ({ data, index, _handleChange, _handleDelete }) => {
  return (
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Box display="flex" alignItems={"center"} p={1}>
          <TextField
            value={data.userAddress}
            variant="outlined"
            size="small"
            onChange={(e) =>
              _handleChange(index, "userAddress", e.target.value)
            }
            style={{ flex: 1, marginRight: 8 }}
            label="Wallet address"
          />
          <TextField
            id="outlined-select-currency-native"
            select
            label="Box Type"
            value={data.boxType}
            onChange={(e) => _handleChange(index, "boxType", e.target.value)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            size="small"
            fullWidth
            style={{ width: 250, marginRight: 8 }}
          >
            {BOX_LIST.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Box Type"
            value={data.nftLevel}
            onChange={(e) => _handleChange(index, "nftLevel", e.target.value)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            size="small"
            fullWidth
            style={{ width: 100, marginRight: 8 }}
          >
            {TIER_LIST.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </TextField>
          <TextField
            value={data.amount}
            variant="outlined"
            size="small"
            onChange={(e) => _handleChange(index, "amount", e.target.value)}
            style={{ width: 100, marginRight: 8 }}
            label="Amount"
          />
          <Box>
            <IconButton
              onClick={() => {
                _handleDelete(index);
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};
