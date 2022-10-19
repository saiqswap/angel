import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import { EndPointConstant } from "../../constants/endpoint";
import { _convertCsvToArray } from "../../settings/format";
import { post } from "../../utils/api";

export default function CreateRIFactoryAccount({
  open,
  _onClose,
  _handleRefresh,
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state);
  const [failList, setFailList] = useState(null);

  useEffect(() => {
    if (!open) {
      setList([]);
    }
  }, [open]);

  const _handleAddSlot = () => {
    const temp = [...list];
    temp.push({
      userId: "",
      rootUserId: "",
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

  const _handleAirdrop = (e) => {
    e.preventDefault();
    if (list.length > 0) {
      dispatch(
        _switchPopup({
          title: "Airdrop Box",
          content: "Are you for this action",
          _handleSubmit: async () => {
            setLoading(true);
            const failList = [];
            for (let index = 0; index < list.length; index++) {
              const iterator = list[index];
              const data = await new Promise((resolve) => {
                post(
                  EndPointConstant.CONFIG_RI_AUTO,
                  iterator,
                  () => {
                    resolve("success");
                  },
                  () => {
                    resolve("fail");
                  }
                );
              });
              if (data === "fail") {
                failList.push(iterator);
              }
            }
            setLoading(false);
            toast.success("Success");
            _handleRefresh();
            _onClose();
          },
        })
      );
    }
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
    <Drawer anchor="right" open={open} onClose={_onClose}>
      <Box className="item-detail" width={700}>
        <Box>
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
          <form style={{ padding: 16 }} onSubmit={_handleAirdrop}>
            <Box
              mb={3}
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={_handleAddSlot}
                  style={{ marginRight: 8 }}
                  disabled={loading}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  onChange={_handleUpload}
                  style={{ marginRight: 8 }}
                  disabled={loading}
                >
                  Upload
                  <input type="file" hidden />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  color="default"
                  style={{ marginRight: 8 }}
                  onClick={_handleClear}
                  disabled={loading}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={loading || !list.length}
                  type="submit"
                >
                  Create
                </Button>
              </Box>
              <Box>
                <Typography>Total: {list.length} item(s)</Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
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
          </form>
        </Box>
      </Box>
    </Drawer>
  );
}

const UserDetail = ({ data, index, _handleChange, _handleDelete }) => {
  return (
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Box display="flex" alignItems={"center"} p={1}>
          <TextField
            value={data.rootUserId}
            variant="outlined"
            size="small"
            onChange={(e) => _handleChange(index, "rootUserId", e.target.value)}
            style={{ flex: 0.5, marginRight: 8 }}
            label="Root User ID"
            required
          />
          <TextField
            value={data.userId}
            variant="outlined"
            size="small"
            onChange={(e) => _handleChange(index, "userId", e.target.value)}
            label="User ID"
            style={{ flex: 0.5 }}
            required
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
