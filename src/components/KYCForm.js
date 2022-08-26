import {
  Drawer,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  ENDPOINT_GET_KYC_SCAN,
  ENDPOINT_GET_PUT_KYC_DETAIL,
} from "../constants/endpoint";
import { get, put } from "../utils/api";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import moment from "moment";
import { Link } from "react-router-dom";
import CustomLoading from "./CustomLoading";
import { useDispatch } from "react-redux";
import { _switchPopup } from "../actions/settingActions";
import { toast } from "react-toastify";

function ZoomImage({ image, callback }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", height: 500 }}>
      <div style={{ width: 500, margin: "auto" }}>
        <ReactPanZoom image={image} alt="document image" />
      </div>
    </div>
  );
}

const reasons = [
  {
    key: 0,
    value: 0,
    text: "Hình ảnh mặt trước ID Card không rõ / Front ID Card is not clear",
  },
  {
    key: 1,
    value: 1,
    text: "Hình ảnh mặt sau ID Card không rõ / Black ID card is not clear",
  },
  {
    key: 2,
    value: 2,
    text: "Hình ảnh xác minh địa chỉ không rõ / Address photo is not clear",
  },
  {
    key: 3,
    value: 3,
    text: "Địa chỉ trên giấy tờ tuỳ thân và xác minh địa chỉ không trùng khớp / Address on identity is not match",
  },
  {
    key: 4,
    value: 4,
    text: "Thông tin trên giấy tờ tuỳ thân không chính xác / Identity information was wrong",
  },
  {
    key: 5,
    value: 5,
    text: `Vui lòng cung cấp thông tin bằng tiếng Anh / Please provide information by English`,
  },
  {
    key: 6,
    value: 6,
    text: `Thông tin cá nhân đã được đăng ký / Identity information was used/dupplicate`,
  },

  {
    key: 7,
    value: 7,
    text: "Không KYC đúng yêu cầu / KYC process perform was not correct",
  },
  {
    key: 8,
    value: 8,
    text: "Hình ảnh giấy tờ xác minh đã bị cắt không đầy đủ / The photo of KYC has been cropped incompletely",
  },
  {
    key: 9,
    value: 9,
    text: " Giấy tờ tuỳ thân của bạn không được chấp nhận / Your ID Card is not accepted",
  },
  {
    key: 10,
    value: 10,
    text: "Xác minh địa chỉ của bạn không được chấp nhận / Address Identity was not be accepted ",
  },
  {
    key: 11,
    value: 11,
    text: "Bạn chưa đủ 18 tuổi / You are under 18 years old",
  },
  {
    key: 12,
    value: 12,
    text: "Khác / Other",
  },
];

export default function KYCForm({ data, _handleClose, _onReload }) {
  const [frontPhoto, setFrontPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");
  const [addressPhoto, setAddressPhoto] = useState("");
  const [imageWannaZoom, setImageWannaZoom] = useState(null);
  const [sameUser, setSameUser] = useState(null);
  const [isOtherReason, setIsOtherReason] = useState(false);
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  useEffect(() => {
    if (!data) {
      setFrontPhoto("");
      setBackPhoto("");
      setAddressPhoto("");
      setImageWannaZoom("");
      setIsOtherReason(false);
      setSameUser(null);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      get(
        `${ENDPOINT_GET_PUT_KYC_DETAIL}/photo?id=${data.id}&fileName=${data.frontPhoto}`,
        (data) => {
          if (data) {
            setFrontPhoto(`data:image/${data.extension};base64,${data.base64}`);
            setImageWannaZoom(
              `data:image/${data.extension};base64,${data.base64}`
            );
          }
        }
      );
      get(
        `${ENDPOINT_GET_PUT_KYC_DETAIL}/photo?id=${data.id}&fileName=${data.backPhoto}`,
        (data) => {
          if (data) {
            setBackPhoto(`data:image/${data.extension};base64,${data.base64}`);
          }
        }
      );
      get(
        `${ENDPOINT_GET_PUT_KYC_DETAIL}/photo?id=${data.id}&fileName=${data.addressPhoto}`,
        (data) => {
          if (data) {
            setAddressPhoto(
              `data:image/${data.extension};base64,${data.base64}`
            );
          }
        }
      );
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      get(`${ENDPOINT_GET_KYC_SCAN}?id=${data.id}`, (sameMember) => {
        setSameUser(sameMember);
        console.log(sameMember);
      });
    }
  }, [data]);

  const _chooseReason = (e) => {
    setReason(e.target.value);
    if (e.target.value === reasons.length - 1) {
      setIsOtherReason(true);
    } else {
      setIsOtherReason(false);
    }
  };

  const _handelSubmit = (type) => {
    if (type === "Reject" && !reason)
      toast.warning("Please choose reason to reject");
    else if (type === "Reject" && reason === reasons.length - 1 && !otherReason)
      toast.warning("Please enter other reason to reject");
    else {
      dispatch(
        _switchPopup({
          title: type + " #" + data.id + " - " + data.username,
          content: "Are you for this action",
          _handleSubmit: () => {
            _handleClose();
            const body = {
              id: data.id,
              status: "VERIFIED",
              note: "",
            };
            if (type === "Reject") {
              body.status = "REJECTED";
              if (reason === reasons.length - 1) {
                body.note = otherReason;
              } else {
                body.note = reasons[reason].text;
              }
            }
            put(
              ENDPOINT_GET_PUT_KYC_DETAIL,
              body,
              () => {
                toast.success(type + " KYC #" + data.id + " success");
                _onReload();
              },
              (error) => toast.error(error.msg)
            );
          },
        })
      );
    }
  };

  return (
    <Drawer anchor="right" open={data !== null}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          padding: 2,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Paper variant="outlined" style={{ padding: 10, height: "100%" }}>
              {data && (
                <>
                  <Typography variant="h6">
                    #{data.id} - {data.status}
                  </Typography>
                  <p>
                    KYC date: {moment(data.createdTime).format("YYYY-MM-DD")}
                  </p>
                  <p>Email: {data.email}</p>
                  <p>
                    Full name: {data.firstName} {data.middleName}{" "}
                    {data.lastName}
                  </p>
                  <p>DOB: {moment(data.dateOfBirth).format("YYYY-MM-DD")}</p>
                  <p>Address: {data.residentialAddress}</p>
                  <p>Country: {data.nationality}</p>
                  <p>City: {data.city}</p>
                  <p>Postal code: {data.postalCode}</p>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={2} align="center">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper variant="outlined" style={{ padding: 5 }}>
                  {frontPhoto ? (
                    <img
                      src={frontPhoto}
                      alt=""
                      style={{
                        height: 140,
                        width: 140,
                        objectFit: "cover",
                        objectPosition: "top",
                        cursor: "pointer",
                      }}
                      onClick={() => setImageWannaZoom(frontPhoto)}
                    />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        width: 140,
                      }}
                    >
                      <CustomLoading />
                    </div>
                  )}
                  <div>Front photo</div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined" style={{ padding: 5 }}>
                  {backPhoto ? (
                    <img
                      src={backPhoto}
                      alt=""
                      style={{
                        height: 140,
                        width: 140,
                        objectFit: "cover",
                        objectPosition: "top",
                        cursor: "pointer",
                      }}
                      onClick={() => setImageWannaZoom(backPhoto)}
                    />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        width: 140,
                      }}
                    >
                      <CustomLoading />
                    </div>
                  )}
                  <div>Back photo</div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined" style={{ padding: 5 }}>
                  {addressPhoto ? (
                    <img
                      src={addressPhoto}
                      alt=""
                      style={{
                        height: 140,
                        width: 140,
                        objectFit: "cover",
                        objectPosition: "top",
                        cursor: "pointer",
                      }}
                      onClick={() => setImageWannaZoom(addressPhoto)}
                    />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        width: 140,
                      }}
                    >
                      <CustomLoading />
                    </div>
                  )}
                  <div>Address photo</div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Paper variant="outlined" style={{ padding: 10, height: "100%" }}>
              {imageWannaZoom && <ZoomImage image={imageWannaZoom} />}
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper variant="outlined" style={{ padding: 10, height: "100%" }}>
              <Typography>Top matched profiles</Typography>
              {sameUser &&
                sameUser.length > 0 &&
                sameUser.map((item, index) => (
                  <Link
                    to={`/user/verification/${item.id}`}
                    target="_blank"
                    key={index}
                  >
                    <Button
                      style={{
                        marginBottom: "0.2em",
                        backgroundColor:
                          item.matchPoints > 5
                            ? "red"
                            : item.matchPoints > 3
                            ? "orange"
                            : null,
                      }}
                    >
                      {item.username} | {item.matchPoints}
                    </Button>
                  </Link>
                ))}
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper variant="outlined" style={{ padding: 10, height: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Choose notice for send user"
                    size="small"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                    onChange={_chooseReason}
                    defaultValue=""
                  >
                    {reasons.map((item, index) => (
                      <MenuItem value={index} key={index}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {isOtherReason && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Lý do/Reason"
                      size="small"
                      multiline
                      rows={4}
                      onChange={(e) => setOtherReason(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10, width: 120 }}
                        onClick={() => _handelSubmit("Confirm")}
                      >
                        Confirm
                      </Button>
                      <Button
                        style={{ width: 120 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => _handelSubmit("Reject")}
                      >
                        Reject
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ width: 120 }}
                        onClick={_handleClose}
                        variant="contained"
                      >
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
}
