import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const formatFieldName = (string) => {
  string = string.replace(/([A-Z])/g, " $1");
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ItemDetail({ data, _onClose }) {
  if (data) {
    Object.keys(data)
      .sort()
      .map((key, index) => console.log(data[key]));
  }

  return (
    <Drawer anchor="right" open={data !== null} onClose={_onClose}>
      <div className="item-detail">
        {data && (
          <div>
            <AppBar position="sticky">
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton onClick={_onClose}>
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Back</Typography>
                </Grid>
              </Grid>
            </AppBar>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(data)
                    .sort()
                    .map(
                      (key, index) =>
                        key !== "properties" && (
                          <TableRow key={index}>
                            <TableCell>{formatFieldName(key)}</TableCell>
                            <TableCell>{data[key]}</TableCell>
                          </TableRow>
                        )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Drawer>
  );
}
