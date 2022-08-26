import {
  AppBar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AngelImages from "../components/manage/AngelImages";
import MinionImages from "../components/manage/MinionImages";
import SkinImages from "../components/manage/SkinImages";
import { API } from "../settings";
import { getAccessToken } from "../utils/auth";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

export const baseUrl = `https://6f7daba956414f5fa57231546ac07221.s3.ap-southeast-1.amazonaws.com`;

function isFileImage(file) {
  const acceptedImageTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "video/mp4",
  ];
  return file && acceptedImageTypes.includes(file["type"]);
}

const _handleUpload = (server, e, callback) => {
  const images = e.target.files;
  let endpoint = `ipfs`;
  const previewImages = [];
  if (server === "s3") {
    endpoint = "s3";
  }
  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (isFileImage(image)) {
        if (image.size < 50000000) {
          var fd = new FormData();
          fd.append("image", image);
          fetch(`${API}/api/v1/upload/${endpoint}?isRandomName=false`, {
            headers: {
              Authorization: "bearer " + getAccessToken(),
            },
            method: "POST",
            body: fd,
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                previewImages.push(json.data.name);
                if (previewImages.length === images.length) {
                  callback(previewImages);
                }
              } else {
                console.log(json);
                toast.error("ERROR");
                return false;
              }
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
        } else {
          toast.error("IMAGE_LARGE");
          return false;
        }
      } else {
        toast.error("IMAGE_CORRECT");
        return false;
      }
    }
  } else {
    return false;
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{
        overflow: "hidden",
        marginTop: 20,
      }}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function S3Component() {
  const [s3Image, setS3Image] = useState([]);
  const [s3Loading, setS3Loading] = useState(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const _uploadS3 = async (e) => {
    setS3Loading(true);
    setS3Image([]);
    _handleUpload("s3", e, (images) => {
      setS3Image(images);
      setS3Loading(false);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Upload S3</Typography>
            </Grid>
            <Grid item xs={12}>
              <input type="file" id="input" onChange={_uploadS3} multiple />
            </Grid>
            {s3Loading && (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            )}
            {s3Image.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Typography style={{ marginBottom: 16 }}>Preview</Typography>
                  <Grid container spacing={1}>
                    {s3Image.map((i, index) => (
                      <Grid item xs={2} key={index}>
                        <Paper>
                          <Box
                            p={1}
                            style={{
                              border: "1px solid rgba(0, 0, 0, 0.26)",
                              borderRadius: 4,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${baseUrl}${i}`}
                              alt=""
                              style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "contain",
                              }}
                            />
                            <TextField
                              value={`${baseUrl}${s3Image}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              disabled
                              label="URL"
                              style={{
                                marginTop: 16,
                              }}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Paper>
      <Box mt={2}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Angel" {...a11yProps(0)} />
            <Tab label="Minion Part" {...a11yProps(1)} />
            <Tab label="Costume" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <AngelImages />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <MinionImages />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <SkinImages />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
