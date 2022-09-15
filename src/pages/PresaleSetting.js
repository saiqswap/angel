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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { _getPreSaleRounds, _updateRoundDetail } from "../onchain";
import { formatAddress, formatNumber } from "../settings/format";

const columns = [
  {
    label: "Round ID",
    key: "roundId",
    format: (value) => formatAddress(value, 8),
  },
  {
    label: "Project ID",
    key: "projectId",
    format: (value) => formatAddress(value, 8),
  },
  {
    label: "Token Address",
    key: "tokenSaleAddress",
    format: (value) => formatAddress(value, 8),
  },
  {
    label: "Total supply",
    key: "totalSupply",
    format: (value) => formatNumber(value, 2) + " ING",
  },
  {
    label: "Sold",
    key: "currentSold",
    format: (value) => formatNumber(value, 2) + " ING",
  },
  {
    label: "USDT price",
    key: "USDPrice",
    format: (value) => formatNumber(value, 4),
  },
  {
    label: "BNB price",
    key: "nativeTokenPrice",
    format: (value) => formatNumber(value, 8),
  },
  {
    label: "Minimum",
    key: "minUSD",
    format: (value) => formatNumber(value, 8) + " USDT",
  },
  {
    label: "Start time",
    key: "startAt",
    format: (value) => moment(value * 1000).format("YYYY-MM-DD HH:mm"),
  },
  {
    label: "End time",
    key: "endAt",
    format: (value) => moment(value * 1000).format("YYYY-MM-DD HH:mm"),
  },
  {
    label: "TGE Time",
    key: "TGETime",
    format: (value) => moment(value * 1000).format("YYYY-MM-DD HH:mm"),
  },
  {
    label: "TGE",
    key: "TGEUnlockPercent",
  },
  {
    label: "No of month",
    key: "cliffMonths",
  },
  {
    label: "Percent in month",
    key: "linearVestingPercentPerMonth",
  },
];

const createUpdateColumns = [
  {
    label: "Round ID",
    key: "roundId",
  },
  {
    label: "Project ID",
    key: "projectId",
  },
  {
    label: "Token Address",
    key: "tokenSaleAddress",
  },
  {
    label: "Minimum (USDT)",
    key: "minUSD",
  },

  {
    label: "Start time",
    key: "startAt",
  },
  {
    label: "End time",
    key: "endAt",
  },
  {
    label: "TGE Time",
    key: "TGETime",
  },
  {
    label: "TGE (%)",
    key: "TGEUnlockPercent",
  },
  {
    label: "No of month",
    key: "cliffMonths",
  },
  {
    label: "Percent in month (%)",
    key: "linearVestingPercentPerMonth",
  },
];

export default function PresaleSetting() {
  const [rounds, setRounds] = useState(null);
  const [roundEditing, setRoundEditing] = useState(null);
  const [flag, setFlag] = useState(false);
  const [roundCreating, setRoundCreating] = useState(false);

  useEffect(() => {
    _getPreSaleRounds((rounds) => setRounds(rounds));
  }, [flag]);

  const _handleClose = () => {
    setRoundEditing(null);
    setRoundCreating(false);
    setFlag((oldFlag) => !oldFlag);
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRoundCreating(true)}
          >
            ADD
          </Button>
        </Grid>
        {rounds?.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper variant="outlined">
              <Box p={2}>
                {columns.map((col, index) => (
                  <Box display="flex" key={index}>
                    <Typography variant="body2" style={{ width: 150 }}>
                      {col.label}
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: 500 }}>
                      {col.format ? col.format(item[col.key]) : item[col.key]}
                    </Typography>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  style={{ marginTop: 8 }}
                  onClick={() => setRoundEditing(item)}
                >
                  Edit
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <EditComponent roundEditing={roundEditing} _onClose={_handleClose} />
      <CreateComponent roundCreating={roundCreating} _onClose={_handleClose} />
    </Box>
  );
}

const EditComponent = ({ roundEditing, _onClose }) => {
  const [loading, setLoading] = useState(false);

  const _handleUpdate = (e) => {
    e.preventDefault();
    const body = roundEditing;
    createUpdateColumns.forEach(
      (col) => (body[col.key] = e.target[col.key].value)
    );
    setLoading(true);
    _updateRoundDetail(
      body,
      () => {
        setLoading(false);
        toast.success("Updated");
        _onClose();
      },
      () => {
        setLoading(false);
        _onClose();
      }
    );
  };

  return (
    <Drawer anchor="right" open={roundEditing !== null}>
      {roundEditing ? (
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
            <form style={{ padding: 16 }} onSubmit={_handleUpdate} noValidate>
              {createUpdateColumns.map((col, index) => (
                <Box key={index} style={{ marginBottom: 16 }}>
                  <TextField
                    defaultValue={roundEditing[col.key]}
                    label={col.label}
                    fullWidth
                    variant="outlined"
                    size="small"
                    id={col.key}
                    name={col.ley}
                    required
                  />
                </Box>
              ))}
              <Box style={{ marginBottom: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Updating" : "Update"}
                </Button>
              </Box>
            </form>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
};

const CreateComponent = ({ roundCreating, _onClose }) => {
  const [loading, setLoading] = useState(false);

  const _handleUpdate = (e) => {
    e.preventDefault();
    const body = {};
    createUpdateColumns.forEach(
      (col) => (body[col.key] = e.target[col.key].value)
    );
    setLoading(true);
    _updateRoundDetail(
      body,
      () => {
        setLoading(false);
        toast.success("Created");
        _onClose();
      },
      () => {
        setLoading(false);
        _onClose();
      }
    );
  };

  return (
    <Drawer anchor="right" open={roundCreating}>
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
          <form style={{ padding: 16 }} onSubmit={_handleUpdate} noValidate>
            {createUpdateColumns.map((col, index) => (
              <Box key={index} style={{ marginBottom: 16 }}>
                <TextField
                  label={col.label}
                  fullWidth
                  variant="outlined"
                  size="small"
                  id={col.key}
                  name={col.ley}
                  required
                />
              </Box>
            ))}

            <Box style={{ marginBottom: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating" : "Create"}
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </Drawer>
  );
};
