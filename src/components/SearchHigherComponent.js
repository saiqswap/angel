import {
  Collapse,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TableContainer,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { _switchPopup } from "../actions/settingActions";
import { ENDPOINT_POST_USER_LOGIN } from "../constants/endpoint";
import { USER_DOMAIN } from "../settings";
import { post, _delete } from "../utils/api";
import CustomPagination from "./CustomPagination";
import CustomTable from "./CustomTable";
import ItemCreate from "./ItemCreate";
import ItemDetail from "./ItemDetail";
import KYCForm from "./KYCForm";
import Meta from "./Meta";
import Toolbar from "./Toolbar";
import moment from "moment";
import { _getRoles } from "../actions/adminActions";
import { userPost } from "../utils/user-api";

function SearchHigherComponent({
  columns,
  SpecialComponent,
  title,
  exportLink,
  createFields,
  updateFields,
  requireFilter,
  deleteEndpoint,
  defaultFilter,
  endpoint,
  component,
  updateEndpoint,
  filterBy,
  showCheckbox,
  getRoles,
  isUserAPI,
  //re mint
  reMintEndpoint,
  isNFTTemplate,
  ...props
}) {
  function WrappedComponent() {
    let { userId } = useParams();
    const [data, setData] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(
      defaultFilter
        ? defaultFilter
        : userId
        ? props.note === "referrals"
          ? { sponsorId: userId }
          : { userId }
        : {}
    );
    const [isReload, setIsReload] = useState(false);
    // const [orderBy, setOrderBy] = useState("");
    // const [isDesc, setIsDesc] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [selectKYC, setSelectKYC] = useState(null);
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(true);
    const [exportData, setExportData] = useState(null);

    useEffect(() => {
      if (getRoles) {
        dispatch(_getRoles());
      }
    }, [dispatch]);

    useEffect(() => {
      setData(null);
      if (!requireFilter || (requireFilter && filters[requireFilter])) {
        if (component === "nfts") {
          if (isNFTTemplate) {
            filters.category = "ROOT";
          } else {
            filters.category = "NFT";
          }
        }
        const body = {
          page,
          pageSize,
          search: "",
          // orderBy,
          // isDesc,
          responseMeta: true,
          filters,
        };
        if (userId && !props.note) body.userId = userId;
        if (userId && props.note === "referrals") {
          body.filters.sponsorId = userId;
        }
        if (isUserAPI) {
          userPost(endpoint, body, (data) => {
            if (mounted) {
              setData(data);
            }
          });
        } else {
          post(endpoint, body, (data) => {
            if (mounted) {
              setData(data);
            }
          });
        }
      } else {
        setData({
          items: [],
        });
        toast(`Please enter ${requireFilter} for filter data`);
      }
    }, [filters, page, pageSize, isReload, userId, mounted]);

    useEffect(() => {
      return () => {
        setMounted(false);
      };
    }, []);

    const _handleChangePageSize = (pageSize) => {
      setPageSize(pageSize);
      setPage(1);
      setSelectedIds([]);
    };

    const _handleChangePage = (page) => {
      setPage(page);
      setSelectedIds([]);
    };

    const _handleSearch = (filters) => {
      setPage(1);
      setFilters(filters);
      setIsReload(!isReload);
      setSelectedIds([]);
    };

    // const _handleSort = (e) => {
    //   setIsDesc(e.isDesc);
    //   setOrderBy(e.orderBy);
    // };

    const _handleReset = () => {
      // setOrderBy("id");
      // setIsDesc(true);
      setFilters(
        defaultFilter
          ? defaultFilter
          : userId
          ? props.note === "referrals"
            ? { sponsorId: userId }
            : { userId }
          : {}
      );
      setSelectedIds([]);
    };

    const _onReload = () => setIsReload(!isReload);

    const _handleDelete = (data) => {
      const id = component === "nfts" ? data.tokenId : data.id;
      dispatch(
        _switchPopup({
          title: "Delete item # " + id,
          content: "Are you for this action",
          _handleSubmit: () => {
            _delete(
              `${deleteEndpoint}?${
                component === "nfts" ? "tokenId" : "id"
              }=${id}`,
              {},
              () => {
                toast.success("Deleted");
                setIsReload(!isReload);
              },
              (error) => toast.error(error.msg)
            );
          },
        })
      );
    };

    const _handleLogin = (id) => {
      dispatch(
        _switchPopup({
          title: "Login account # " + id + " by token",
          content: "Are you for this action",
          _handleSubmit: () => {
            post(
              `${ENDPOINT_POST_USER_LOGIN}?userId=${id}`,
              {},
              (data) => {
                window.open(
                  `${USER_DOMAIN}/login-by-token/${data.accessToken}`,
                  "_blank"
                );
              },
              (error) => toast.error(error.msg)
            );
          },
        })
      );
    };

    const _handleExport = () => {
      dispatch(
        _switchPopup({
          title: "Export just only 10000 items",
          content: "Are you for this action",
          _handleSubmit: () => {
            const body = {
              page,
              pageSize: data.itemCount,
              filters,
            };
            post(endpoint, body, (data) => {
              setExportData(data.items);
              document.getElementById("export-btn").click();
            });
          },
        })
      );
    };

    const _handleReMint = (data) => {
      dispatch(
        _switchPopup({
          title: "Remint item # " + data.tokenId,
          content: "Are you for this action",
          _handleSubmit: () => {
            post(
              `${reMintEndpoint}?tokenId=${data.tokenId}`,
              {},
              () => {
                toast.success("Reminted");
                setIsReload(!isReload);
              },
              (error) => toast.error(error.msg)
            );
          },
        })
      );
    };

    return (
      <Grid container spacing={5}>
        <Grid item xs={12}>
          {title && !userId && (
            <Typography variant="h5" style={{ fontWeight: 500 }}>
              {title}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Toolbar
            filters={filters}
            filterBy={filterBy}
            updateFields={updateFields}
            createFields={createFields}
            defaultFilter={defaultFilter}
            note={props.note}
            exportLink={exportLink}
            _onReload={() => setIsReload(!isReload)}
            _onReset={_handleReset}
            _onSearch={_handleSearch}
            _handleShowCreate={() => setShowCreate(true)}
            _handleExport={_handleExport}
          />
        </Grid>
        {data && data.meta && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  color="primary"
                />
              }
              label="Show statistic"
            />
            <Collapse in={checked}>
              <Meta meta={data.meta} />
            </Collapse>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper variant="outlined">
            {SpecialComponent && (
              <SpecialComponent
                ids={selectedIds}
                _reload={() => {
                  setIsReload(!isReload);
                  setSelectedIds([]);
                }}
              />
            )}
            <TableContainer
              style={{
                whiteSpace: "nowrap",
                overflow: "auto",
              }}
            >
              <CustomTable
                columns={columns}
                data={data}
                pageSize={pageSize}
                selectedIds={selectedIds}
                updateFields={updateFields}
                createFields={createFields}
                showCheckbox={showCheckbox}
                _handleSelectItem={(e) => setSelectedItem(e)}
                _handleSelectedIds={(e) => {
                  setSelectedIds(e);
                }}
                _handleEditItem={(e) => setSelectedEdit(e)}
                _handleSelectKYC={(e) => {
                  setSelectKYC(null);
                  setSelectKYC(e);
                }}
                _handleDelete={_handleDelete}
                _handleLogin={_handleLogin}
                deleteEndpoint={deleteEndpoint}
                //remint
                reMintEndpoint={reMintEndpoint}
                _handleReMint={_handleReMint}
              />
            </TableContainer>
            <CustomPagination
              data={data}
              changePageSize={_handleChangePageSize}
              changePage={_handleChangePage}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ItemDetail
            data={selectedItem}
            _onClose={() => setSelectedItem(null)}
          />
          {updateFields && (
            <ItemCreate
              open={selectedEdit !== null}
              type="update"
              defaultData={selectedEdit ? selectedEdit : {}}
              updateFields={updateFields}
              updateEndpoint={updateEndpoint}
              _onClose={() => setSelectedEdit(null)}
              _onReload={_onReload}
            />
          )}
          {createFields && (
            <ItemCreate
              open={showCreate}
              type="create"
              defaultData={{}}
              createFields={createFields}
              updateEndpoint={updateEndpoint}
              _onClose={() => setShowCreate(false)}
              _onReload={_onReload}
            />
          )}
          {component === "verification" && (
            <KYCForm
              data={selectKYC}
              _handleClose={() => setSelectKYC(null)}
              _onReload={_onReload}
            />
          )}
        </Grid>
        {exportData && (
          <CSVLink
            data={exportData}
            headers={columns}
            hidden
            id="export-btn"
            filename={`export-${title
              .toLowerCase()
              .replace(" ", "-")}-${moment().format(
              "YYYY-MM-DD_hh-mm-ss"
            )}.csv`}
          />
        )}
      </Grid>
    );
  }
  return WrappedComponent;
}

export default SearchHigherComponent;
