import {
  Avatar,
  Grid,
  Paper,
  Typography,
  CardHeader,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
// import ImageGallery from "../../../components/common/image-gallery/ImageGallery";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { ENDPOINT_FEED_DETAIL, ENDPOINT_USER } from "../../constants/endpoint";
import { userGet } from "../../utils/user-api";
import Comment from "../../components/comment/Comments";
import { _delete } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { _switchPopup } from "../../actions/settingActions";

export default function FeedDetail() {
  const { token } = useParams();
  const [data, setData] = useState({
    images: [],
  });
  const [account, setAccount] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const param = token.split("_");
    userGet(
      `${ENDPOINT_FEED_DETAIL}?tokenAddress=${param[0]}&tokenId=${param[1]}`,
      (data) => {
        setData(data);
        console.log(data);
        userGet(`${ENDPOINT_USER}?account=${data.ownerAddress}`, (data) =>
          setAccount(data)
        );
      }
    );
  }, [token]);

  const _handleDelete = () => {
    dispatch(
      _switchPopup({
        title: "Delete feed # " + data.id,
        content: "Are you for this action",
        _handleSubmit: () => {
          _delete(
            `${ENDPOINT_FEED_DETAIL}?id=${data.id}`,
            {},
            () => {
              toast.success("Deleted");
              history.push("/feed/list");
            },
            (error) => toast.error(error.code)
          );
        },
      })
    );
  };

  return (
    data && (
      <Grid container spacing={2}>
        <Grid item xs={12} align="right">
          <Button color="secondary" variant="contained" onClick={_handleDelete}>
            Delete post
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            className="box p-0"
            style={{
              overflow: "hidden",
              minHeight: "calc(100vh - 110px)",
              background: "none",
              boxShadow: "none",
              position: "sticky",
              //   top: 88,
            }}
          >
            {data.images.length > 0 ? (
              data.images.map((item, index) => (
                <img
                  src={item}
                  alt=""
                  key={index}
                  style={{
                    width: "100%",
                  }}
                />
              ))
            ) : (
              <ContentDetail data={data} account={account} />
            )}
          </Paper>
        </Grid>
        {data.images.length > 0 && (
          <Grid item xs={12} lg={6}>
            <ContentDetail data={data} account={account} />
          </Grid>
        )}
      </Grid>
    )
  );
}

const ContentDetail = ({ data, account }) => {
  return (
    <Paper style={{ height: "100%" }}>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader
              avatar={<Avatar src={account.avatarImage}></Avatar>}
              title={<Typography>{account.username}</Typography>}
              subheader={moment(data.createdTime).fromNow()}
              style={{ padding: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>{ReactHtmlParser(data.content)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Comment data={data} account={account} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
