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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import {
  EndPointConstant,
  ENDPOINT_NFT_GET_LIST,
  ENDPOINT_POST_USER_LIST,
} from "../../constants/endpoint";
import { _convertCsvToArray } from "../../settings/format";
import { post } from "../../utils/api";
import CustomLoading from "../CustomLoading";

export default function SettingRIFactorySlots({
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
    if (userInformation) {
      post(
        ENDPOINT_NFT_GET_LIST,
        {
          page: 1,
          pageSize: 1000,
          filters: {
            account: userInformation.address,
          },
        },
        (data) => setNftList(data.items)
      );
    }
  }, [userInformation]);

  useEffect(() => {
    if (!selectedUser) {
      setList([]);
    }
  }, [selectedUser]);

  const _handelAddNew = () => {
    const temp = [...list];
    temp.push({
      minionType: "",
      skinType: "",
      type: 0,
    });
    setList(temp);
  };

  const _handleAddAvailable = () => {
    const temp = [...list];
    temp.push({
      angelTokenId: "",
      minionTokenId: "",
      skinTokenId: "",
      type: 1,
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
    <Drawer anchor="right" open={Boolean(selectedUser)} onClose={_onClose}>
      <Box className="item-detail" width={700}>
        {nftList ? (
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
                  <Button
                    variant="contained"
                    onClick={_handleAddAvailable}
                    style={{ marginRight: 8 }}
                    disabled={loading}
                    color="primary"
                  >
                    Add available
                  </Button>
                  <Button
                    variant="contained"
                    onClick={_handelAddNew}
                    style={{ marginRight: 8 }}
                    disabled={loading}
                    color="primary"
                  >
                    Add new
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
                    nftList={nftList}
                  />
                ))}
              </Grid>
            </form>
          </Box>
        ) : (
          <Box p={3}>
            <CustomLoading />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

const UserDetail = ({ data, nftList, index, _handleChange, _handleDelete }) => {
  const [angels, setAngels] = useState(null);
  const [minions, setMinions] = useState(null);
  const [costumes, setCostumes] = useState(null);

  useEffect(() => {
    if (nftList) {
      setAngels(nftList.filter((nft) => nft.type === "ANGEL"));
      setMinions(nftList.filter((nft) => nft.type === "MINION_PARTS"));
      setCostumes(nftList.filter((nft) => nft.type === "COSTUME"));
    }
  }, [nftList]);

  return (
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Box display="flex" alignItems={"center"} p={1}>
          {data.type ? (
            <>
              <TextField
                value={data.angelTokenId}
                variant="outlined"
                size="small"
                onChange={(e) =>
                  _handleChange(index, "angelTokenId", e.target.value)
                }
                style={{ flex: 0.5, marginRight: 8 }}
                label="Angel"
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {angels?.map((angel, index) => (
                  <option key={index} value={angel.tokenId}>
                    {angel.tokenId} - {angel.name} - {angel.level}
                  </option>
                ))}
              </TextField>
              <TextField
                value={data.minionTokenId}
                variant="outlined"
                size="small"
                onChange={(e) =>
                  _handleChange(index, "minionTokenId", e.target.value)
                }
                style={{ flex: 0.5, marginRight: 8 }}
                label="Minion Parts"
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {minions?.map((minion, index) => (
                  <option key={index} value={minion.tokenId}>
                    {minion.tokenId} - {minion.name} - {minion.level}
                  </option>
                ))}
              </TextField>
              <TextField
                value={data.skinTokenId}
                variant="outlined"
                size="small"
                onChange={(e) =>
                  _handleChange(index, "skinTokenId", e.target.value)
                }
                style={{ flex: 0.5, marginRight: 8 }}
                label="Costumes"
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {costumes?.map((costume, index) => (
                  <option key={index} value={costume.tokenId}>
                    {costume.tokenId} - {costume.name} - {costume.level}
                  </option>
                ))}
              </TextField>
            </>
          ) : (
            <>
              <TextField
                value={data.minionType}
                variant="outlined"
                size="small"
                onChange={(e) =>
                  _handleChange(index, "minionType", e.target.value)
                }
                style={{ flex: 0.5, marginRight: 8 }}
                label="Minion Part Box Type"
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {["MINION_PARTS_COMMON", "MINION_PARTS_EPIC"].map(
                  (box, index) => (
                    <option key={index} value={box}>
                      {box}
                    </option>
                  )
                )}
              </TextField>
              <TextField
                value={data.skinType}
                variant="outlined"
                size="small"
                onChange={(e) =>
                  _handleChange(index, "skinType", e.target.value)
                }
                style={{ flex: 0.5, marginRight: 8 }}
                label="Costume Box Type"
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {["COSTUME_COMMON", "COSTUME_EPIC"].map((box, index) => (
                  <option key={index} value={box}>
                    {box}
                  </option>
                ))}
              </TextField>
            </>
          )}

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
