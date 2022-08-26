import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { People } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { ENDPOINT_GET_DASHBOARD } from "../constants/endpoint";
import { formatAmount } from "../settings/format";
import { get } from "../utils/api";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { Link } from "react-router-dom";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [lotChart, setLotChard] = useState([]);
  const [mineChart, setMineChard] = useState([]);
  const [commissionChart, setCommissionChard] = useState([]);
  const [estimate, setEstimate] = useState([]);
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    get(`${ENDPOINT_GET_DASHBOARD}?type=basic`, (data) => {
      if (mounted) {
        setData(data);
      }
    });
  }, [mounted]);

  useEffect(() => {
    if (chart && chart.lotChartItems) {
      const lotChart = [];
      chart.lotChartItems.map((item) =>
        lotChart.push({
          name: moment(item.time).utc().format("YYYY-MM-DD"),
          totalSell: item.totalSell,
          amt: 1,
        })
      );
      setLotChard(lotChart);
      const mineChart = [];
      chart.mineChartItems.map((item) =>
        mineChart.push({
          name: moment(item.time).utc().format("YYYY-MM-DD"),
          amount: item.amount,
          amt: 1,
        })
      );
      setMineChard(mineChart);
      let commissionChart = chart.directComChartItems;
      commissionChart.map((item, index) => {
        let binaryAmount = chart.binaryComChartItems.filter(
          (i) => i.time === item.time
        )[0];
        binaryAmount = binaryAmount ? binaryAmount.amount : 0;
        let matchingAmount = chart.matchingComChartItems.filter(
          (i) => i.time === item.time
        )[0];
        matchingAmount = matchingAmount ? matchingAmount.amount : 0;
        item.binaryAmount = binaryAmount;
        item.matchingAmount = matchingAmount;
        item.time = moment(item.time).utc().format("YYYY-MM-DD");
        return false;
      });
      setCommissionChard(commissionChart);
      const estimate = chart.estimateMineChartItems;
      estimate.map(
        (item) => (item.time = moment(item.time).utc().format("YYYY-MM-DD"))
      );
      setEstimate(estimate);
    }
  }, [chart]);

  const _handleLoadChart = () => {
    setLoading(true);
    get(`${ENDPOINT_GET_DASHBOARD}?type=advance`, (data) => {
      if (mounted) {
        setChart(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">
                {data && formatAmount(data.newUser24H)}
              </Typography>
              <Typography>24h</Typography>
            </Grid>
            <Grid item>
              <People fontSize="large" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="info.main" color="info.contrastText" p={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">
                {data && formatAmount(data.newUser7D)}
              </Typography>
              <Typography>7 days</Typography>
            </Grid>
            <Grid item>
              <People fontSize="large" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="success.main" color="info.contrastText" p={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">
                {data && formatAmount(data.newUser30D)}
              </Typography>
              <Typography>30 days</Typography>
            </Grid>
            <Grid item>
              <People fontSize="large" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Link to="/user/verifications">
          <Box bgcolor="warning.main" color="info.contrastText" p={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">
                  {data && formatAmount(data.pendingKyc)}
                </Typography>
                <Typography>KYC Pending</Typography>
              </Grid>
              <Grid item>
                <FingerprintIcon fontSize="large" />
              </Grid>
            </Grid>
          </Box>
        </Link>
      </Grid>
      <Grid item xs={4}>
        <Link to="/fund/pending-withdraws">
          <Box bgcolor="secondary.main" color="info.contrastText" p={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">
                  {data && formatAmount(data.pendingWithdraw)}
                </Typography>
                <Typography>Withdrawals pending</Typography>
              </Grid>
              <Grid item>
                <ImportContactsIcon fontSize="large" />
              </Grid>
            </Grid>
          </Box>
        </Link>
      </Grid>
      <Grid item xs={4}>
        <Link to="/fund/approved-withdraws">
          <Box bgcolor="error.main" color="info.contrastText" p={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">
                  {data && formatAmount(data.confirmingWithdraw)}
                </Typography>
                <Typography>Withdrawals confirming</Typography>
              </Grid>
              <Grid item>
                <ImportContactsIcon fontSize="large" />
              </Grid>
            </Grid>
          </Box>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="primary"
          onClick={_handleLoadChart}
          disabled={loading}
          style={{ width: 160 }}
        >
          {loading ? <CircularProgress size={24} /> : "Load data chart"}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Paper align="center">
          <Box p={2}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: 40 }}
            >
              <Grid item>
                <Typography align="left">Plan statistic ($)</Typography>
              </Grid>
              <Grid item>
                Total sell: {formatAmount(chart && chart.totalSell)}$
              </Grid>
            </Grid>
            <AreaChart
              width={500}
              height={300}
              data={lotChart}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalSell"
                name="Total sell"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper align="center">
          <Box p={2}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <Grid item xs={6} align="left">
                <Typography>Mine statistic (FIL)</Typography>
              </Grid>
              <Grid item xs={6} align="right">
                Release: {formatAmount(chart && chart.totalRelease)} FIL
              </Grid>
              <Grid item xs={6} align="left">
                Total: {formatAmount(chart && chart.totalMined)} FIL
              </Grid>
              <Grid item xs={6} align="right">
                Block: {formatAmount(chart && chart.filBlockAmount)} FIL
              </Grid>
            </Grid>
            <AreaChart
              width={500}
              height={300}
              data={mineChart}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                name="Amount"
                stroke="#8884d8"
                fill="rgb(33, 150, 243)"
              />
            </AreaChart>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper align="center">
          <Box p={2}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <Grid item>
                <Typography>Commission statistic (USDT)</Typography>
                <Typography align="left">
                  Direct: {chart && formatAmount(chart.directCom)} USDT
                </Typography>{" "}
              </Grid>
              <Grid item>
                <Typography>
                  Total: {chart && formatAmount(chart.totalCom)} USDT
                </Typography>{" "}
                <Typography>
                  Binary: {chart && formatAmount(chart.binaryCom)} USDT
                </Typography>{" "}
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 500 }}>
                  Current commission rate: {chart && chart.currentComRate}%
                </Typography>
                <Typography align="right">
                  Matching: {chart && formatAmount(chart.matchingCom)} USDT
                </Typography>{" "}
              </Grid>
            </Grid>
            <LineChart
              width={1000}
              height={300}
              data={commissionChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="Direct"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="binaryAmount"
                name="Binary"
                stroke="#82ca9d"
              />
              <Line
                type="monotone"
                dataKey="matchingAmount"
                name="Matching"
                stroke="rgb(245, 0, 87)"
              />
            </LineChart>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper align="center">
          <Box p={2}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <Grid item>
                <Typography>Estimate Mine (FIL)</Typography>
              </Grid>
              <Grid item>
                MIN: {formatAmount(chart && chart.estimateMinTotalMine)} FIL
              </Grid>
              <Grid item style={{ fontWeight: 900 }}>
                AVG: {formatAmount(chart && chart.estimateAvgTotalMine)} FIL
              </Grid>
              <Grid item>
                MAX: {formatAmount(chart && chart.estimateMaxTotalMine)} FIL
              </Grid>
            </Grid>
            <AreaChart
              width={1000}
              height={300}
              data={estimate}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="minMine"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="avgMine"
                stackId="1"
                stroke="rgb(130, 202, 157)"
                fill="rgb(130, 202, 157)"
              />
              <Area
                type="monotone"
                dataKey="maxMine"
                stackId="1"
                stroke="rgb(245, 0, 87)"
                fill="rgb(245, 0, 87)"
              />
            </AreaChart>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
