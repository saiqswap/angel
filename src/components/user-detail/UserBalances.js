import { Grid, Paper, Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ENDPOINT_POST_BALANCES } from "../../constants/endpoint";
import { formatAmount } from "../../settings/format";
import { get } from "../../utils/api";

export default function UserBalances({ data }) {
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    get(`${ENDPOINT_POST_BALANCES}?userId=${data.id}`, (data) => {
      setBalances(data);
    });
  }, [data.id]);

  return (
    balances && (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {balances.map((balance, index) => (
            <Grid item xs={3} key={index}>
              <Paper variant="outlined">
                <Box p={2}>
                  <Typography>{balance.asset}</Typography>
                  <Typography variant="subtitle2">
                    Amount: {formatAmount(balance.amount)}
                  </Typography>
                  <Typography variant="subtitle2">
                    Lock: {formatAmount(balance.amount)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    )
  );
}
