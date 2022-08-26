import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Collapse,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Comment.scss";
// import CommentInput from "./CommentInput";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
// import ImageGallery from "../common/image-gallery/ImageGallery";
// import {
//   _addAccount,
//   _getComments,
//   _resetComments,
// } from "../../store/actions/generalActions";
// import { SELECT_FEED } from "../../store/constants";
import { userPost } from "../../utils/user-api";
import {
  ENDPOINT_CREATE_COMMENT,
  ENDPOINT_GET_COMMENT,
} from "../../constants/endpoint";
import { _delete } from "../../utils/api";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";

const pageSize = 20;

export default function Comment({ data, account }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState(null);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  // const _selectedFeed = () => {
  //   dispatch({
  //     type: SELECT_FEED,
  //     payload: { ...data, account: account },
  //   });
  // };

  useEffect(() => {
    if (data && data.id) {
      const param = {
        page: page,
        pageSize: pageSize,
        filters: {
          postId: data.tokenId,
        },
      };
      userPost(ENDPOINT_GET_COMMENT, param, (data) => setComments(data));
    }
  }, [data, page]);

  // useEffect(() => {
  //   if (comments && comments.length > 0) {
  //     dispatch(_addAccount(loadedAccount, comments, page, pageSize));
  //   }
  // }, [JSON.stringify(comments)]);

  return (
    comments && (
      <div className="comment-box">
        <Box display="flex" justifyContent="space-between">
          <div onClick={null} className="pointer">
            {data.donateCount} Ganet
          </div>
          {comments.itemCount > 0 && <div> {comments.itemCount} comments</div>}
        </Box>
        {/* <CommentInput
        postId={data.id}
        onCommentSuccess={onCommentSuccess}
      /> */}
        {comments.items.map((comment, index) => (
          <Box marginTop={3}>
            <CommentItem data={comment} index={index} key={index} />
          </Box>
        ))}
        <Collapse in={loading}>
          <Box display="flex" justifyContent="center" margin="10px 0px">
            <CircularProgress size={30} style={{ color: "#adafca" }} />
          </Box>
        </Collapse>
        {comments.length < comments.itemCount && (
          <Box display="flex" justifyContent="space-between" marginTop="10px">
            <span className="view-more-btn" onClick={() => handleLoadMore()}>
              View more comments
            </span>
            <span>{`${comments.length} / ${comments.itemCount}`}</span>
          </Box>
        )}
      </div>
    )
  );
}

const CommentItem = ({ data }) => {
  const dispatch = useDispatch();
  // const { loadedAccount } = general;
  // const [account, setAccount] = useState(null);

  // useEffect(() => {
  //   if (data && data.ownerAddress) {
  //     const found = loadedAccount.find((el) => {
  //       return el && el.account === data.ownerAddress;
  //     });
  //     if (found) {
  //       setAccount(found);
  //     }
  //   }
  // }, [data, JSON.stringify(loadedAccount)]);

  const _handleDelete = (id) => {
    dispatch(
      _switchPopup({
        title: "Delete comment # " + id,
        content: "Are you for this action",
        _handleSubmit: () => {
          _delete(
            `${ENDPOINT_CREATE_COMMENT}?id=${id}`,
            {},
            () => toast.success("Deleted"),
            (error) => toast.error(error.code)
          );
        },
      })
    );
  };

  return (
    true && (
      <Paper variant="outlined">
        <Box display="flex" justifyContent="flex-start" padding={2}>
          <Avatar src={data.avatarImage} />
          <Box
            className={
              "input-content text " + (data.posting === true ? "disabled" : "")
            }
            position="relative"
          >
            {data.posting === true && (
              <CircularProgress
                size={20}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "#adafca",
                }}
              />
            )}
            <span className="user-name">{data.ownerAddress}</span>
            <Typography>{ReactHtmlParser(data.content)}</Typography>
            {data.images[0] && (
              <Box
                borderRadius="12px"
                marginBottom="5px"
                overflow="hidden"
                maxWidth="300px"
                maxHeight={300}
                style={{ position: "relative", width: "100%", marginLeft: 2 }}
              >
                <img src={data.images[0]} alt="" />
              </Box>
            )}
            <span className="time">
              <span>{moment(data.createdTime).fromNow()}</span>
              {!data.posting && data.ownerAddress && (
                <>
                  <span className="blank">|</span>
                  <span className="btn">Update</span>
                  <span className="blank">|</span>
                  <span className="btn" onClick={() => _handleDelete(data.id)}>
                    Delete
                  </span>
                </>
              )}
            </span>
          </Box>
        </Box>
      </Paper>
    )
  );
};
