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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";

const formatFieldName = (string) => {
  string = string.replace(/([A-Z])/g, " $1");
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function ItemDetail({ data, _onClose }) {
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
                    .map((key, index) => {
                      if (key === "items") {
                        const items = data[key];
                        const array = [];
                        items.forEach((item) => {
                          const index = array.findIndex(
                            (e) => e.boxType === item.boxType
                          );
                          if (index < 0) {
                            array.push({ boxType: item.boxType, amount: 1 });
                          } else {
                            array[index].amount += 1;
                          }
                        });
                        return (
                          <TableRow key={index}>
                            <TableCell>{formatFieldName(key)}</TableCell>
                            <TableCell>
                              {array.map((item, index) => (
                                <Typography variant="body2" key={index}>
                                  {item.boxType}: {item.amount}
                                </Typography>
                              ))}
                            </TableCell>
                          </TableRow>
                        );
                      }
                      if (key === "products") {
                        return null;
                      }
                      if (key === "box") {
                        return null;
                      }
                      if (key === "slots") {
                        return null;
                      }
                      return (
                        key !== "properties" && (
                          <TableRow key={index}>
                            <TableCell>{formatFieldName(key)}</TableCell>
                            <TableCell>{data[key]}</TableCell>
                          </TableRow>
                        )
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Drawer>
  );
}
