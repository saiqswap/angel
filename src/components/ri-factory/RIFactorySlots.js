import {
  AppBar,
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import {
  EndPointConstant,
  ENDPOINT_POST_USER_LIST,
} from "../../constants/endpoint";
import { post, _delete } from "../../utils/api";

export default function RiFactorySlots({
  selectedUser,
  _onClose,
  _handleRefresh,
}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state);
  const [failList, setFailList] = useState(null);
  const [nftList, setNftList] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      post(
        ENDPOINT_POST_USER_LIST,
        {
          page: 1,
          pageSize: 1,
          responseMeta: false,
          filters: {
            id: selectedUser.userId,
          },
        },
        (data) => {
          const { itemCount, items } = data;
          if (itemCount > 0) {
            setUserInformation(items[0]);
          } else {
            toast.error("User not found");
          }
        }
      );
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) {
      setList([]);
    }
  }, [selectedUser]);

  const _handleCreateSlots = (e) => {
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
              if (iterator.type) {
                iterator.angelTokenId = parseFloat(iterator.angelTokenId);
                iterator.minionTokenId = parseFloat(iterator.minionTokenId);
                iterator.skinTokenId = parseFloat(iterator.skinTokenId);
              }
              const data = await new Promise((resolve) => {
                post(
                  `${EndPointConstant.CONFIG_RI_AUTO_SLOT}/${selectedUser.userId}`,
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

  const _handleDelete = (slot) => {
    dispatch(
      _switchPopup({
        title: `Delete slot ${slot.id}`,
        content: "Are you for this action",
        _handleSubmit: async () => {
          _delete(
            `${EndPointConstant.RI_FACTORY_DELETE_SLOT}/${slot.id}`,
            {},
            () => {
              toast.success("Success");
              _handleRefresh();
              _onClose();
            },
            () => toast.error("Fail")
          );
        },
      })
    );
  };

  return (
    <Drawer anchor="right" open={Boolean(selectedUser)} onClose={_onClose}>
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
          <form style={{ padding: 16 }} onSubmit={_handleCreateSlots}>
            {selectedUser && (
              <Paper variant="outlined">
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography>User: {selectedUser.userId}</Typography>
                  <Typography>Root: {selectedUser.rootUserId}</Typography>
                </Box>
              </Paper>
            )}
            <Box
              mt={2}
              mb={3}
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              <Box>
                <Typography>
                  Total: {selectedUser?.slots?.length} item(s)
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {selectedUser?.slots?.map((slot) => (
                <Grid item xs={6}>
                  <Paper variant="outlined" style={{ position: "relative" }}>
                    <IconButton
                      style={{
                        position: "absolute",
                        right: 0,
                      }}
                      onClick={() => _handleDelete(slot)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                    <Box p={1}>
                      <Typography variant="body2">
                        Angel: {slot.angelTokenId}
                      </Typography>
                      <Typography variant="body2">
                        Minion Parts: {slot.minionTokenId}
                      </Typography>
                      <Typography variant="body2">
                        Costume: {slot.skinTokenId}
                      </Typography>
                      <Typography variant="body2">
                        Status:{" "}
                        {slot.isActive ? (
                          <span className="text-green">ACTIVE</span>
                        ) : (
                          <span className="text-red">INACTIVE</span>
                        )}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
}
