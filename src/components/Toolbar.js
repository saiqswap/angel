import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Grid } from "@material-ui/core";
import moment from "moment";
import ItemField from "./ItemField";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { Add, SearchOutlined } from "@material-ui/icons";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CachedIcon from "@material-ui/icons/Cached";
import { useParams } from "react-router-dom";

function Toolbar({
  filterBy,
  component = "",
  exportLink,
  createFields,
  // defaultValue,
  _onReload,
  _onReset,
  _onSearch,
  _handleShowCreate,
  defaultFilter,
  note,
  isProfile,
  _handleExport,
}) {
  const [filters, setFilters] = useState({});
  const [showToolbar, setShowToolbar] = useState(true);
  const { userId } = useParams();

  const _handleSearch = (e) => {
    e.preventDefault();
    _onSearch(filters);
  };

  const _handleReset = () => {
    setFilters({});
    _onReset();
    setShowToolbar(false);
    setTimeout(() => {
      setShowToolbar(true);
    }, 1);
  };

  const _onChange = (e) => {
    if (e.target.name === "to" || e.target.name === "from") {
      filters[e.target.name] = moment(e.target.value + " 00:00:00").valueOf();
    } else {
      filters[e.target.name] = e.target.value.trim();
    }
    setFilters(filters);
  };

  return (
    <form onSubmit={_handleSearch} id="filter-form">
      <Grid container spacing={3}>
        {filterBy &&
          (showToolbar ? (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {filterBy.map((item, index) => {
                  if (
                    ((userId && note !== "referrals") || isProfile) &&
                    (item.key === "userId" ||
                      item.key === "username" ||
                      item.key === "email" ||
                      item.key === "wallet")
                  ) {
                    return null;
                  } else {
                    return (
                      <ItemField
                        data={item}
                        key={index}
                        onChange={_onChange}
                        filters={filters}
                        defaultFilter={defaultFilter}
                      />
                    );
                  }
                })}
              </Grid>
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              style={{
                height: Math.ceil(filterBy.length / 6) * 56,
              }}
            ></Grid>
          ))}
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {filterBy && (
                <>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        <SearchOutlined fontSize="small" /> Search
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="button"
                        onClick={_handleReset}
                        variant="contained"
                        color="secondary"
                      >
                        <RotateLeftIcon fontSize="small" /> Reset
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="button"
                        onClick={_onReload}
                        variant="contained"
                        color="default"
                      >
                        <CachedIcon fontSize="small" /> Refresh
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                {createFields && (
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={_handleShowCreate}
                      disabled={!createFields}
                      variant="contained"
                    >
                      <Add fontSize="small" />
                      Add item
                    </Button>
                  </Grid>
                )}
                {exportLink && (
                  <Grid item>
                    <Button
                      type="button"
                      onClick={_handleExport}
                      disabled={!exportLink}
                      variant="contained"
                    >
                      <ImportExportIcon fontSize="small" /> Local export
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Toolbar;
