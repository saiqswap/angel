import { Box, Button, Paper } from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import ItemField from "../../components/ItemField";
import { ENDPOINT_MINTING_BOX_EXPORT } from "../../constants/endpoint";
import { get } from "../../utils/api";

function uniq(a) {
  var prims = { boolean: {}, number: {}, string: {} },
    objs = [];

  return a.filter(function (item) {
    var type = typeof item;
    if (type in prims)
      return prims[type].hasOwnProperty(item)
        ? false
        : (prims[type][item] = true);
    else return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}

export default function MintingBoxExport() {
  const [exportData, setExportData] = useState(null);

  const _handleExport = (e) => {
    e.preventDefault();
    get(
      `${ENDPOINT_MINTING_BOX_EXPORT}?round=${e.target.round.value}`,
      (data) => {
        const list = [];
        for (const element of data) {
          const boxes = element.rounds[0].products;
          const combos = element.rounds[0].combos;

          boxes?.forEach((box) => {
            const ref = uniq(box.refIds).toString();
            list.push({
              address: element.address,
              singleBoxType: box.boxType,
              quantity: box.amount,
              location: box.location,
              ref,
            });
          });
          combos?.forEach((combo) => {
            const ref = uniq(combo.refIds).toString();
            list.push({
              address: element.address,
              comboType: combo.type,
              quantity: combo.amount,
              location: combo.location,
              ref,
            });
          });
        }
        setExportData(list);
      }
    );
  };

  return (
    <Paper
      style={{
        width: 500,
      }}
    >
      <Box p={2} component="form" onSubmit={_handleExport}>
        <ItemField
          data={{
            key: "round",
            type: "select",
            col: 12,
            text: "Round number",
            selectName: "MINTING_ROUND",
            require: true,
          }}
        />
        <Box sx={{ mt: 2 }} />
        <Button type="submit" variant="contained">
          Export
        </Button>
        {exportData && (
          <>
            <CSVLink
              data={exportData}
              headers={[
                { label: "Address", key: "address" },
                { label: "Quantity", key: "quantity" },
                { label: "Single box type", key: "singleBoxType" },
                { label: "Combo type", key: "comboType" },
                { label: "Location", key: "location" },
                { label: "Refs", key: "ref" },
              ]}
              //   hidden
              id="export-btn"
              filename={`export-minting-box-${moment().format(
                "YYYY-MM-DD_hh-mm-ss"
              )}.csv`}
            >
              <Button
                color="primary"
                variant="contained"
                style={{ marginLeft: 8 }}
              >
                Download
              </Button>
            </CSVLink>
          </>
        )}
      </Box>
    </Paper>
  );
}
