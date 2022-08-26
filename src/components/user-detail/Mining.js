import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ENDPOINT_GET_TRANSACTION_STATISTIC } from "../../constants/endpoint";
import { formatAmount } from "../../settings/format";
import { get } from "../../utils/api";

export default function Mining({ data }) {
  const [statistic, setStatistic] = useState(null);

  useEffect(() => {
    if (data) {
      get(`${ENDPOINT_GET_TRANSACTION_STATISTIC}/?userId=${data.id}`, (data) =>
        setStatistic(data)
      );
    }
  }, [data]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper
            style={{
              padding: 20,
              height: "100%",
            }}
            variant="outlined"
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} align="center">
                <div>
                  <small>Rank</small>
                </div>
                <img
                  src={`/images/ranks/${data && data.rank}.png`}
                  style={{ width: 50, height: 50, margin: "auto" }}
                  alt=""
                />
                <Typography>{data && data.rank}</Typography>
              </Grid>
              <Grid item xs={6} align="center">
                <div>
                  <small>Package</small>
                </div>
                <img
                  src={`/images/packages/${data && data.package}_2.png`}
                  style={{ width: 50, height: 50, margin: "auto" }}
                  alt=""
                />
                <Typography>{data && data.package}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            style={{
              padding: 20,
            }}
            variant="outlined"
          >
            <Grid container justifyContent="space-between" align="center">
              <Grid item>
                <Typography variant="body2">Total commission</Typography>
                <Typography
                  variant="h5"
                  style={{ marginTop: 15, marginBottom: 15 }}
                >
                  {statistic && formatAmount(statistic.totalCom)}
                </Typography>
                <Typography variant="subtitle2">USDT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Total direct commission</Typography>
                <Typography
                  variant="h5"
                  style={{ marginTop: 15, marginBottom: 15 }}
                >
                  {statistic && formatAmount(statistic.totalDirectCom)}
                </Typography>
                <Typography variant="subtitle2">USDT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">Total binary commission</Typography>
                <Typography
                  variant="h5"
                  style={{ marginTop: 15, marginBottom: 15 }}
                >
                  {statistic && formatAmount(statistic.totalBinaryCom)}
                </Typography>
                <Typography variant="subtitle2">USDT</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Total matching commission
                </Typography>
                <Typography
                  variant="h5"
                  style={{ marginTop: 15, marginBottom: 15 }}
                >
                  {statistic && formatAmount(statistic.totalMatchingCom)}
                </Typography>
                <Typography variant="subtitle2">USDT</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
