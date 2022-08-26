import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import { TYPE_LEVEL } from "../../constants";
import { get, post, put, _delete } from "../../utils/api";

export default function AngelBoxes() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch((state) => state);
  const [selected, setSelected] = useState(null);

  const loadData = () => {
    setData(null);
    get(`/adm-api/v1/config/box-open-rate?boxType=ANGEL`, (data) => {
      setData(data);
    });
  };

  useState(() => {
    loadData();
  }, []);

  const _handleClose = () => {
    setOpen(false);
    setSelected(null);
  };
  const _handleOpen = () => setOpen(true);

  const _handleSubmit = (e) => {
    e.preventDefault();
    const nftLevel = e.target.nftLevel.value;
    const rate = e.target.rate.value;
    if (selected) {
      put(
        `/adm-api/v1/config/box-open-rate`,
        {
          id: selected.id,
          nftLevel,
          rate,
        },
        () => {
          toast.success("Updated");
          loadData();
          setOpen(false);
          setSelected(null);
        },
        (error) => console.log(error)
      );
    } else {
      post(
        `/adm-api/v1/config/box-open-rate`,
        {
          nftLevel,
          rate,
          boxType: "ANGEL",
          nftType: "ANGEL",
        },
        () => {
          toast.success("Created");
          loadData();
          setOpen(false);
          setSelected(null);
        },
        (error) => console.log(error)
      );
    }
  };

  const _handelRemove = (id) => {
    dispatch(
      _switchPopup({
        title: "Notification",
        content: "Are you for this action",
        _handleSubmit: () => {
          _delete(`/adm-api/v1/config/box-open-rate?id=${id}`, {}, () => {
            loadData();
          });
        },
      })
    );
  };

  return (
    <div>
      <Box mb={2}>
        <Button variant="outlined" onClick={_handleOpen}>
          Create Angel Box
        </Button>
      </Box>
      <Grid container spacing={2}>
        {data === null && (
          <Grid item xs={12} align="center">
            <CircularProgress />
          </Grid>
        )}
        {data &&
          data.map((item, index) => (
            <Grid item key={index} xs={4}>
              <Paper>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      Level: {item.nftLevel}
                    </Grid>
                    <Grid item xs={12}>
                      Open rate: {item.rate}%
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          setOpen(true);
                          setSelected(item);
                        }}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => _handelRemove(item.id)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
      <Drawer anchor="right" open={open} onClose={_handleClose}>
        <Box width={350} p={2}>
          <form onSubmit={_handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {selected ? "Update" : "Create"} Angel Open Create
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  label="Level"
                  id="nftLevel"
                  defaultValue={selected ? selected.nftLevel : "TIER_1"}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  {TYPE_LEVEL.map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  label="Rate"
                  id="rate"
                  defaultValue={selected ? selected.rate : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {selected ? "Update" : "Create"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={_handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

const AngelImage = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    post(
      `/adm-api/v1/nft/get-list`,
      {
        page: 1,
        pageSize: 1,
        filters: {
          tokenId: id,
        },
      },
      (data) => setData(data.items[0]),
      (error) => toast.error(error.msg)
    );
  }, [id]);

  return data && data.fileUri ? (
    <img
      src={data.fileUri}
      alt=""
      style={{
        width: "calc(100% - 32px)",
        objectFit: "contain",
        position: "absolute",
        bottom: 16,
        left: 16,
      }}
    />
  ) : null;
};
