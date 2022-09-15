import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { get, post, put, _delete } from "../../utils/api";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import {
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { TYPE_LEVEL } from "../../constants";
import { ENDPOINT_CONFIG_BOX_OPEN_RATE } from "../../constants/endpoint";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        width: "100%",
      }}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SkinBoxes() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <Box mb={2}>
        <Typography variant="h5" style={{ fontWeight: 500 }}>
        Costume Boxes
        </Typography>
      </Box> */}
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Common" {...a11yProps(0)} />
          <Tab label="Epic" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Boxes type="COSTUME_COMMON" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Boxes type="COSTUME_EPIC" />
        </TabPanel>
      </div>
    </>
  );
}

const Boxes = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch((state) => state);
  const [selected, setSelected] = useState(null);

  const loadData = () => {
    setData(null);
    get(`${ENDPOINT_CONFIG_BOX_OPEN_RATE}?boxType=${type}`, (data) => {
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
    const rate = e.target.rate.value;
    const nftLevel = e.target.nftLevel.value;
    setOpen(false);
    if (selected) {
      put(
        `${ENDPOINT_CONFIG_BOX_OPEN_RATE}`,
        {
          id: selected.id,
          boxType: type,
          nftType: "COSTUME",
          nftLevel,
          rate,
        },
        () => {
          toast.success("Updated");
          setSelected(null);
          loadData();
        },
        (error) => console.log(error)
      );
    } else {
      post(
        `${ENDPOINT_CONFIG_BOX_OPEN_RATE}`,
        {
          boxType: type,
          nftType: "COSTUME",
          nftLevel,
          rate,
        },
        () => {
          toast.success("Created");
          setSelected(null);
          loadData();
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
          _delete(`${ENDPOINT_CONFIG_BOX_OPEN_RATE}?id=${id}`, {}, () => {
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
          Create Costume Box
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
                    {/* <Grid item xs={12}>
                      <Box height={300} position="relative">
                        <AngelImage id={item.nftId} />
                      </Box>
                    </Grid> */}
                    <Grid item xs={12}>
                      ID: {item.id}
                    </Grid>
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
      <Drawer anchor="right" open={open}>
        <Box width={350} p={2}>
          <form onSubmit={_handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {selected ? "Update" : "Create"} Costume Open Create
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
                  defaultValue={selected ? selected.nftLevel : TYPE_LEVEL[0]}
                  // disabled={selected}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  {TYPE_LEVEL.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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
};
