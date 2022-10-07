import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, Close, Edit } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  EndPointConstant,
  ENDPOINT_NFT_GET_LIST,
} from "../../constants/endpoint";
import { _getImage } from "../../settings";
import { post, put } from "../../utils/api";
import AddListComponent from "../AddListComponent";

const model = {
  name: "",
  description: "",
  properties: {
    class: "",
    stats: "",
    skills: [],
    riTime: 0,
    riPerformance: ["10", "30"],
  },
  fileUri: "UNKNOWN",
  status: "ACTIVE",
  gameId: "",
  level: "TIER_1",
  researchLimit: 4,
  basePrice: 0,
  minListingPrice: null,
  maxListingPrice: null,
};

const rows = [
  {
    id: "name",
    label: "Name",
  },
  {
    label: "Description",
    id: "description",
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    list: ["ACTIVE", "INACTIVE"],
  },
  {
    id: "level",
    label: "Level",
    type: "select",
    list: ["TIER_1", "TIER_2", "TIER_3", "TIER_4", "TIER_5"],
  },
  { id: "basePrice", label: "Base Price", type: "input" },
  { id: "gameId", label: "Game ID", type: "input" },
  { id: "minListingPrice", label: "Min Listing Price", type: "input" },
  { id: "maxListingPrice", label: "Max Listing Price", type: "input" },
];

const propertiesRows = [
  {
    id: "class",
    label: "Class",
  },
  {
    id: "stats",
    label: "Stats",
  },
];

export default function AngelTemplates() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState(model);
  const [skills, setSkills] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    post(
      ENDPOINT_NFT_GET_LIST,
      {
        filters: {
          category: "ROOT",
          type: "ANGEL",
        },
        pageSize,
        page,
      },
      (data) => setData(data)
    );
  }, [page, pageSize, refresh]);

  const columns = [
    {
      id: "name",
      label: "",
      format: (value) => (
        <img
          src={_getImage(`body_${value.toLowerCase()}.png`)}
          alt=""
          width={50}
        />
      ),
    },
    { id: "tokenId", label: "Token ID", align: "left" },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "level",
      label: "Level",
    },
    { id: "basePrice", label: "Base Price" },
    { id: "minListingPrice", label: "Min Listing Price" },
    { id: "maxListingPrice", label: "Max Listing Price" },
    {
      id: "status",
      label: "Status",
    },
    {
      id: "createdTime",
      label: "Created Time",
      format: (value) => moment(value).format("yyyy-MM-DD hh:mm:ss"),
      align: "right",
    },
  ];

  const _handleChangePage = (event, newPage) => {
    setData(null);
    setPage(newPage + 1);
  };

  const _handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(1);
    setData(null);
  };

  const _handleChange = (e) => {
    let temp = { ...defaultData };
    temp[e.target.id] = e.target.value;
    setDefaultData(temp);
  };

  const _handlePropertyChange = (e) => {
    let temp = { ...defaultData };
    temp.properties[e.target.id] = e.target.value;
    setDefaultData(temp);
  };

  const _handleCreateTemplate = () => {
    defaultData.properties.skills = skills;
    if (defaultData.tokenId) {
      put(EndPointConstant.NFT_POST, defaultData, () => {
        toast.success("Update");
        setOpen(false);
        setRefresh(!refresh);
        setDefaultData(model);
        setSkills([]);
      });
    } else {
      defaultData.type = "ANGEL";
      post(EndPointConstant.NFT_POST, defaultData, () => {
        toast.success("Created");
        setOpen(false);
        setRefresh(!refresh);
        setDefaultData(model);
        setSkills([]);
      });
    }
  };

  const _selectRow = (row) => {
    setOpen(true);
    let temp = { ...defaultData };
    for (var key in temp) {
      if (row.hasOwnProperty(key)) {
        temp[key] = row[key];
      }
    }
    temp.tokenId = row.tokenId;
    setDefaultData(temp);
    setSkills(row.properties.skills);
  };

  return (
    <div>
      <Box textAlign={"right"} mb={2}>
        <Button
          color="primary"
          onClick={() => {
            setOpen(true);
            setDefaultData(model);
          }}
          variant="contained"
        >
          <Add fontSize="small" />
          Add Angle template
        </Button>
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.items.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => _selectRow(row)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.itemCount}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={_handleChangePage}
          onRowsPerPageChange={_handleChangeRowsPerPage}
        />
      )}
      <SwipeableDrawer anchor={"right"} open={open}>
        <Box p={2} width={500}>
          <Box textAlign="right" mb={2}>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {rows.map((row) => (
              <Grid item xs={12} key={row.id}>
                {row.type === "select" ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={row.label}
                    id={row.id}
                    value={defaultData[row.id]}
                    onChange={_handleChange}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {row.list.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={row.label}
                    id={row.id}
                    value={defaultData[row.id]}
                    onChange={_handleChange}
                  />
                )}
              </Grid>
            ))}
            {propertiesRows.map((row) => (
              <Grid item xs={12} key={row.id}>
                {row.type === "select" ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={row.label}
                    id={row.id}
                    value={defaultData.properties[row.id]}
                    onChange={_handlePropertyChange}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {row.list.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label={row.label}
                    id={row.id}
                    value={defaultData.properties[row.id]}
                    onChange={_handlePropertyChange}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <AddListComponent
                data={skills}
                _handleSave={(e) => setSkills(e)}
                title="Skills"
              />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Box p={2}>
                  <Box mb={2}>
                    <Typography>Performance</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        variant="outlined"
                        fullWidth
                        label={"Min"}
                        value={defaultData.properties.riPerformance[0]}
                        onChange={(e) => {
                          let temp = { ...defaultData };
                          temp.properties.riPerformance[0] = e.target.value;
                          setDefaultData(temp);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        variant="outlined"
                        fullWidth
                        label={"Max"}
                        value={defaultData.properties.riPerformance[1]}
                        onChange={(e) => {
                          let temp = { ...defaultData };
                          temp.properties.riPerformance[1] = e.target.value;
                          setDefaultData(temp);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        variant="outlined"
                        fullWidth
                        label={"Time"}
                        value={defaultData.properties.riTime}
                        onChange={(e) => {
                          let temp = { ...defaultData };
                          temp.properties.riTime = e.target.value;
                          setDefaultData(temp);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={_handleCreateTemplate}
                variant="contained"
                color="primary"
              >
                {defaultData.tokenId ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
