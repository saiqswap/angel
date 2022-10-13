import { Box, Button, Drawer, Grid } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FETCH_USER } from "../constants";
import { ENDPOINT_POST_USER_LIST } from "../constants/endpoint";
import { post } from "../utils/api";
import CustomLoading from "./CustomLoading";
import Actions from "./user-detail/Actions";
import Info from "./user-detail/Info";
import UserBalances from "./user-detail/UserBalances";
import UserTransaction from "./user-detail/UserTransactions";

export default function CurrentUserProfile() {
  const { admin } = useSelector((state) => state);
  const { currentUser } = admin;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (currentUser) {
      post(
        ENDPOINT_POST_USER_LIST,
        {
          page: 1,
          pageSize: 1,
          responseMeta: false,
          filters: {
            id: currentUser,
          },
        },
        (data) => {
          const { itemCount, items } = data;
          if (itemCount > 0 && mounted) {
            setData(items[0]);
          } else {
            toast.error("User not found");
          }
        }
      );
    } else {
      setData(null);
    }
  }, [currentUser, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const _onClose = () => {
    dispatch({
      type: FETCH_USER,
      payload: null,
    });
  };

  return (
    <Drawer anchor="right" open={currentUser !== null} onClose={_onClose}>
      <Box width="70vw" p={3}>
        {data ? (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Button variant="contained" onClick={_onClose}>
                <ArrowBackIos fontSize="small" />
                Back
              </Button>
            </Grid>
            <Info data={data} />
            <UserBalances data={data} />
            <Actions data={data} _success={() => setIsReload(!isReload)} />
            <UserTransaction userId={data.id} userAddress={data.address} />
          </Grid>
        ) : (
          <CustomLoading />
        )}
      </Box>
    </Drawer>
  );
}
