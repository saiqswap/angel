import { Grid, Paper, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { formatAmount, formatShortUSD } from "../settings/format";
import { library } from "../settings/library";

function MetaByCoin({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Paper
            style={{
              padding: 20,
              textAlign: "center",
            }}
          >
            <div>{item.asset}</div>
            <Typography variant="h5">{formatAmount(item.amount)}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function MetaByBaseQuote({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Paper
            style={{
              padding: 20,
              textAlign: "center",
            }}
          >
            <div>{item.coin}</div>
            <div>
              {formatShortUSD(item.baseAmount)} {item.base}{" "}
              <ArrowBack name="arrow right" />
              {formatShortUSD(item.quoteAmount)} {item.quote}
            </div>
            <div>
              Fee: {item.totalFee} {item.base}
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function MetaByType({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Paper
            style={{
              padding: 20,
              textAlign: "center",
            }}
          >
            <div>
              {item.type === "ADD" ? "Add to " : "Release from "}{" "}
              {library[item.poolType] ? library[item.poolType] : item.poolType}
            </div>
            <Typography variant="h5">
              {formatAmount(item.totalAmount)}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function MetaByPoolType({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Paper
            style={{
              padding: 20,
              textAlign: "center",
            }}
          >
            <div>{library[item.type] ? library[item.type] : item.type}</div>
            <Typography variant="h5">
              {formatAmount(item.totalAmount)}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function Meta({ meta }) {
  if (meta[0] && meta[0].asset) {
    return <MetaByCoin data={meta} />;
  } else if (meta[0] && meta[0].base) {
    return <MetaByBaseQuote data={meta} />;
  } else if (meta[0] && meta[0].poolType) {
    return <MetaByType data={meta} />;
  } else if (meta[0] && meta[0].type) {
    return <MetaByPoolType data={meta} />;
  } else {
    return (
      <Grid container spacing={2}>
        {Object.keys(meta).map((key, index) => (
          <Grid item xs={3} key={index}>
            <Paper
              style={{
                padding: 20,
                textAlign: "center",
              }}
            >
              <div>{library[key] ? library[key] : key}</div>
              <Typography variant="h4">{formatAmount(meta[key])}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Meta;
