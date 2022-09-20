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
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { BOX_LIST, TIER_LIST } from "../../constants";
import {
  ENDPOINT_AIRDROP_NORMAL_BOX,
  ENDPOINT_AIRDROP_SPECIAL_BOX,
  ENDPOINT_AIRDROP_WHITELIST,
  ENDPOINT_AIRDROP_GET_WHITELIST,
} from "../../constants/endpoint";
import { _convertCsvToArray } from "../../settings/format";
import { post } from "../../utils/api";

export default function BoxByTypeAndTier() {
  const [list, setList] = useState([]);
  const [DataWhitelist, setDataWhitelist] = useState([]);

  const _handleAddSlot = () => {
    const temp = [...list];
    temp.push({
      Email: "",
      Address: "",
      ReferralLink: "",
      amount: "0",
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
      ENDPOINT_AIRDROP_WHITELIST,
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
      const newArray = array.map (p=>{
        p.Type === "INO" ? p.Type = "0" :  console.log("fail convert Type")
      }
        );
      array = array.filter((item) => item.address !== "" && item);
      const temp = [...list, ...array];
      setList(temp);
    };
    reader.readAsText(file);
  };

  const _handleClear = () => setList([]);
  useEffect(() => {
    post(
      ENDPOINT_AIRDROP_GET_WHITELIST,
      {
        page: 1,
        pageSize: 10,
        // responseMeta: false,
        // filters: {
        //   id: userId,
        // },
      },
      (data) => {
        setDataWhitelist(data.items)
      }
    );
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Whitelist</Typography>
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
        {list.length === 0 && <Helper dataWhitelist={DataWhitelist} />}
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

const Helper = (props) => {
  return (
    <>
      <Paper variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>ReferralLink</TableCell>
              {/* <TableCell>amount</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props && props.dataWhitelist.map((box, index) => (
              <TableRow>
                <TableCell>
                  {box.email}
                </TableCell>
                <TableCell> {box.address}</TableCell>
                <TableCell> <a href={box.referralLink}>{box.referralLink}</a></TableCell>
                {/* <TableCell>{index + 1}</TableCell> */}
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
            value={data.Email}
            variant="outlined"
            size="small"
            onChange={(e) =>
              _handleChange(index, "Email", e.target.value)
            }
            style={{ flex: 1, marginRight: 8 }}
            label="Email"
          />
            <TextField
            value={data.Address}
            variant="outlined"
            size="small"
            onChange={(e) => _handleChange(index, "Address", e.target.value)}
            style={{ flex: 1, marginRight: 8 }}
            label="Address"
          />
            <TextField
            value={data.ReferralLink}
            variant="outlined"
            size="small"
            onChange={(e) => _handleChange(index, "ReferralLink", e.target.value)}
            style={{ flex: 1, marginRight: 8 }}
            label="ReferralLink"
          />
          <TextField
            id="outlined-select-currency-native"
            select
            label="Type"
            value="0"
            onChange={(e) => _handleChange(index, "amount", e.target.value)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            size="small"
            fullWidth
            style={{ width: 250, marginRight: 8 }}
          >
            {/* {BOX_LIST.map((option) => ( */}
              <option value="0">
               INO
              </option>
            {/* ))} */}
          </TextField>
          {/* <TextField
            id="outlined-select-currency-native"
            select
            label="Box Type"
            value={data.ReferralLink}
            onChange={(e) => _handleChange(index, "ReferralLink", e.target.value)}
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
          /> */}
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
