import { Grid, Paper, Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  EndPointConstant,
  ENDPOINT_POST_BALANCES,
} from "../../constants/endpoint";
import { formatAmount } from "../../settings/format";
import { get } from "../../utils/api";

export default function UserBalances({ data }) {
  const [balances, setBalances] = useState(null);
  const [mounted, setMounted] = useState(true);
  const [debtBalances, setDebtBalances] = useState(null);

  useEffect(() => {
    get(`${ENDPOINT_POST_BALANCES}?userId=${data.id}`, (data) => {
      if (mounted) {
        setBalances(data);
      }
    });
    get(
      `${EndPointConstant.USER_GET_DEBT_BALANCES}?address=${data.address}`,
      (data) => setDebtBalances(data)
    );
  }, [data.address, data.id, mounted]);

  useEffect(() => {
    return () => setMounted(false);
  }, []);

  return (
    balances &&
    debtBalances && (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {balances.map((balance, index) => {
            const debt = debtBalances.find((d) => d.asset === balance.asset);
            return (
              <Grid item xs={3} key={index}>
                <Paper variant="outlined">
                  <Box p={2}>
                    <Typography>{balance.asset}</Typography>
                    <Typography variant="subtitle2">
                      Amount: {formatAmount(balance.amount)}
                    </Typography>
                    <Typography variant="subtitle2">
                      Lock: {formatAmount(balance.lockAmount)}
                    </Typography>
                    <Typography variant="subtitle2">
                      Debt: {formatAmount(debt?.amount)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    )
  );
}
