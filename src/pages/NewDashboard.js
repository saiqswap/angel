import React, { useState } from "react";
import { Grid, Paper, Box, Divider, Typography } from "@material-ui/core";
import { post } from "../utils/api";
import {
  ENDPOINT_POST_DEPOSIT_HISTORY,
  ENDPOINT_POST_LOT,
  ENDPOINT_POST_USER_LIST,
  ENDPOINT_POST_WITHDRAW_HISTORY,
} from "../constants/endpoint";
import { Link } from "react-router-dom";
import { formatAddress, formatShortUSD } from "../settings/format";
import moment from "moment";

export default function NewDashboard() {
  const [recentPlans, setRecentPlans] = useState(null);
  const [recentUsers, setRecentUsers] = useState(null);
  const [recentDeposits, setRecentDeposits] = useState(null);
  const [recentWithdraws, setRecentWithdraws] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState(null);

  useState(() => {
    post(
      `/adm-api/v1/nft/get-list`,
      {
        page: 1,
        pageSize: 5,
      },
      (data) => setRecentPlans(data.items)
    );
    post(
      ENDPOINT_POST_USER_LIST,
      {
        page: 1,
        pageSize: 5,
        filters: {},
      },
      (data) => setRecentUsers(data.items)
    );
    // post(
    //   ENDPOINT_POST_DEPOSIT_HISTORY,
    //   {
    //     page: 1,
    //     pageSize: 5,
    //     filters: {},
    //   },
    //   (data) => setRecentDeposits(data ? data.items : null)
    // );
    // post(
    //   ENDPOINT_POST_WITHDRAW_HISTORY,
    //   {
    //     page: 1,
    //     pageSize: 5,
    //     filters: {},
    //   },
    //   (data) => setRecentWithdraws(data ? data.items : null)
    // );
    post(
      `/adm-api/v1/nft-transaction/get-list`,
      {
        page: 1,
        pageSize: 5,
      },
      (data) => setRecentTransactions(data.items)
    );
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box mb={2}>
              <Typography style={{ fontWeight: 600 }}>Recent NFT</Typography>
            </Box>
            <Divider />
            {recentPlans &&
              recentPlans.map((item, index) => (
                <Box key={index} mt={2} mb={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                      #{item.tokenId}
                    </Grid>
                    <Grid item xs={6}>
                      {formatAddress(item.mintTxHash)}
                    </Grid>
                    <Grid item xs={2}>
                      {moment(item.createTime).format("YYYY-MM-DD")}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Divider />
            <Box mt={2} textAlign="center">
              <Link to="/nft/list">View more</Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box mb={2}>
              <Typography style={{ fontWeight: 600 }}>Recent users</Typography>
            </Box>
            <Divider />
            {recentUsers &&
              recentUsers.map((item, index) => (
                <Box key={index} mt={2} mb={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                      {item.email}
                    </Grid>
                    <Grid item xs={5}>
                      {formatAddress(item.address)}
                    </Grid>
                    <Grid item xs={2}>
                      {moment(item.createTime).format("YYYY-MM-DD")}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Divider />
            <Box mt={2} textAlign="center">
              <Link to="/user/list">View more</Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box mb={2}>
              <Typography style={{ fontWeight: 600 }}>
                Recent Transactions
              </Typography>
            </Box>
            <Divider />
            {recentTransactions &&
              recentTransactions.map((item, index) => (
                <Box key={index} mt={2} mb={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={3}>
                      #{item.id}
                    </Grid>
                    <Grid item xs={3}>
                      {formatShortUSD(item.amount)} {item.coin}
                    </Grid>
                    <Grid item xs={3}>
                      {item.type}
                    </Grid>
                    <Grid item xs={3}>
                      {moment(item.createTime).format("YYYY-MM-DD")}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Divider />
            <Box mt={2} textAlign="center">
              <Link to="/transactions">View more</Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
      {/* <Grid item xs={6}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box mb={2}>
              <Typography style={{ fontWeight: 600 }}>
                Recent deposits
              </Typography>
            </Box>
            <Divider />
            {recentDeposits &&
              recentDeposits.map((item, index) => (
                <Box key={index} mt={2} mb={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                      {item.username}
                    </Grid>
                    <Grid item xs={4}>
                      {formatShortUSD(item.amount)} {item.asset}
                    </Grid>
                    <Grid item xs={4}>
                      {item.type}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Divider />
            <Box mt={2} textAlign="center">
              <Link to="/fund/deposits">View more</Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box mb={2}>
              <Typography style={{ fontWeight: 600 }}>
                Recent withdraws
              </Typography>
            </Box>
            <Divider />
            {recentWithdraws &&
              recentWithdraws.map((item, index) => (
                <Box key={index} mt={2} mb={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                      {item.username}
                    </Grid>
                    <Grid item xs={4}>
                      {formatShortUSD(item.amount)} {item.asset}
                    </Grid>
                    <Grid item xs={4}>
                      {item.type}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Divider />
            <Box mt={2} textAlign="center">
              <Link to="/fund/withdraws">View more</Link>
            </Box>
          </Box>
        </Paper>
      </Grid> */}
    </Grid>
  );
}
