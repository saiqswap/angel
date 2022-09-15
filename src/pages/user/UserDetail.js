import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomLoading from "../../components/CustomLoading";
import ItemDetail from "../../components/ItemDetail";
import Actions from "../../components/user-detail/Actions";
import Info from "../../components/user-detail/Info";
import Transactions from "../../components/user-detail/UserTransactions";
import UserBalances from "../../components/user-detail/UserBalances";
import { ENDPOINT_POST_USER_LIST } from "../../constants/endpoint";
import { post } from "../../utils/api";

export default function UserDetail() {
  const [data, setData] = useState(null);
  const { userId } = useParams();
  const history = useHistory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    post(
      ENDPOINT_POST_USER_LIST,
      {
        page: 1,
        pageSize: 1,
        responseMeta: false,
        filters: {
          id: userId,
        },
      },
      (data) => {
        const { itemCount, items } = data;
        if (itemCount > 0) {
          if (mounted) {
            setData(items[0]);
          }
        } else {
          history.push("/user/list");
        }
      }
    );
  }, [history, userId, isReload, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return data ? (
    <Grid container spacing={2} alignItems="center">
      <Info data={data} _selectItem={() => setSelectedItem(data)} />
      <UserBalances data={data} />
      <Actions data={data} _success={() => setIsReload(!isReload)} />
      <ItemDetail data={selectedItem} _onClose={() => setSelectedItem(null)} />
      <Transactions />
    </Grid>
  ) : (
    <CustomLoading />
  );
}
