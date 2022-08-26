import { Grid, Typography, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { ENDPOINT_GET_PUT_KYC_DETAIL } from "../../constants/endpoint";
import { get } from "../../utils/api";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import moment from "moment";
import { useParams } from "react-router-dom";
import CustomLoading from "../../components/CustomLoading";

function ZoomImage({ image, callback }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", height: 500 }}>
      <div style={{ width: 500, margin: "auto" }}>
        <ReactPanZoom image={image} alt="document image" />
      </div>
    </div>
  );
}

export default function VerificationView() {
  const [frontPhoto, setFrontPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");
  const [addressPhoto, setAddressPhoto] = useState("");
  const [imageWannaZoom, setImageWannaZoom] = useState(null);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!data) {
      setFrontPhoto("");
      setBackPhoto("");
      setAddressPhoto("");
      setImageWannaZoom("");
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
      // get(`${ENDPOINT_GET_KYC_SCAN}?id=${data.id}`, (data) =>
      //   setSameUser(data)
      // );
    }
  }, [data]);

  useEffect(
    () =>
      get(`${ENDPOINT_GET_PUT_KYC_DETAIL}?id=${id}`, (data) => setData(data)),
    [id]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        padding: 2,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999999,
        background: "#f0f2f5",
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
                <p>KYC date: {moment(data.createdTime).format("YYYY-MM-DD")}</p>
                <p>Email: {data.email}</p>
                <p>Username: {data.username}</p>
                <p>
                  Full name: {data.firstName} {data.middleName} {data.lastName}
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
      </Grid>
    </div>
  );
}
