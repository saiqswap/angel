import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Check, CheckCircle, Close } from "@material-ui/icons";
import DetailsIcon from "@material-ui/icons/Details";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import RefreshIcon from "@material-ui/icons/Refresh";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { _switchPopup } from "../actions/settingActions";
import { ACTIVE, BLOCK, INTERNAL, NEW } from "../constants";
import {
  ENDPOINT_GET_HOT_WALLET,
  ENDPOINT_RESEND_WITHDRAW,
} from "../constants/endpoint";
import { baseUrl, _getImage } from "../settings";
import { formatAddress, formatNumber, getLinkHash } from "../settings/format";
import { library } from "../settings/library";
import { get, put } from "../utils/api";
import { checkScope } from "../utils/auth";
import { formatNftName } from "../utils/format";
import CustomLoading from "./CustomLoading";
import ItemDetail from "./ItemDetail";
import LinkToEmail from "./LinkToEmail";
import LinkToOwnerAddress from "./LinkToOwnerAddress";

function CustomTable({
  columns,
  data,
  action,
  selectedIds,
  pageSize,
  updateFields,
  showCheckbox,
  deleteEndpoint,
  _handleSelectedIds,
  _handleSelectItem,
  _handleEditItem,
  _handleSelectKYC,
  _handleDelete,
  _handleLogin,
  //remint
  reMintEndpoint,
  _handleReMint,
  isProfile,
  isResend,
}) {
  const [rows, setRows] = useState(null);
  const dispatch = useDispatch();
  const [selectedBoxDetail, setSelectedBoxDetail] = useState(null);

  if (isProfile) {
    const index = columns.findIndex((object) => {
      return object.isEmail;
    });
    if (index > -1) {
      columns.splice(index, 1);
    }
  }

  useEffect(() => {
    if (data) {
      setRows(data.items);
    } else {
      setRows(null);
    }
  }, [data]);

  const _handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      _handleSelectedIds(newSelected);
    } else {
      _handleSelectedIds([]);
    }
  };

  const _handleClick = (id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }
    _handleSelectedIds(newSelected);
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  const _handleResendWithdraw = (row) => {
    dispatch(
      _switchPopup({
        title: "Resend withdraw # " + row.id,
        content: "Are you for this action",
        _handleSubmit: () => {
          put(
            `${ENDPOINT_RESEND_WITHDRAW}/${row.id}`,
            {},
            () => {
              toast.success("Success");
            },
            () => toast.error("Fail")
          );
        },
      })
    );
  };

  return (
    <>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            {showCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={_handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                  color="primary"
                  checked={selectedIds.length === pageSize}
                />
              </TableCell>
            )}
            {columns.map((item, index) => (
              <TableCell key={index} style={{ fontWeight: "700" }}>
                {item.label}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, index) => {
              let statusColor = null;
              if (row.status === ACTIVE) {
                statusColor = "green-color";
              }
              if (row.status === BLOCK) {
                statusColor = "red-color";
              }
              if (row.status === NEW) {
                statusColor = "blue-color";
              }
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow key={index} selected={isItemSelected}>
                  {showCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        color="primary"
                        name={row.id}
                        onClick={() =>
                          showCheckbox ? _handleClick(row.id) : false
                        }
                      />
                    </TableCell>
                  )}
                  {columns.map((col, colIndex) => {
                    let result = row[col.key];
                    const {
                      isId,
                      isAmount,
                      isEmail,
                      isTime,
                      isType,
                      isStatus,
                      isDate,
                      isGA,
                      isHash,
                      isAddress,
                      isArray,
                      isBool,
                      isHotWallet,
                      isTransfer,
                      isFeedToken,
                      isLevel,
                      isContent,
                      isCount,
                      isImage,
                      isUsed,
                      isINOItems,
                      isNFTImage,
                      isOwnerAddress,
                      isBoxDetail,
                    } = col;
                    if (isINOItems) {
                      const items = row[col.key];
                      let mintCount = 0;
                      items.forEach((e) => {
                        if (e.box.mintTxHash) {
                          mintCount++;
                        }
                      });
                      result = `${mintCount}/${items.length}`;
                    }
                    if (!row[col.key] && row[col.key] !== 0) {
                      result = "--/--";
                    }
                    if (isId) {
                      result = "#" + row[col.key];
                    }
                    if (isEmail) {
                      result = (
                        <LinkToEmail
                          id={row[col.userId]}
                          email={row[col.key]}
                          item={row}
                          action={action}
                          _handleSelectKYC={() => _handleSelectKYC(row)}
                        />
                      );
                    }
                    if (isOwnerAddress) {
                      result = (
                        <LinkToOwnerAddress
                          id={row[col.userId]}
                          address={row[col.key]}
                        />
                      );
                    }
                    if (isHash) {
                      row.type === INTERNAL
                        ? (result = (
                            <LinkToEmail
                              id={
                                col.userId === "senderId"
                                  ? row[col.userId]
                                  : null
                              }
                              email={row[col.key]}
                            />
                          ))
                        : (result = getLinkHash(row));
                    }
                    if (isAmount) result = formatNumber(row[col.key]);
                    if (isTime)
                      result = moment(row[col.key]).format(
                        "YYYY-MM-DD HH:mm:ss"
                      );
                    if (isDate)
                      result = moment(row[col.key]).format("YYYY-MM-DD");
                    if (isAddress)
                      result =
                        row.type === "TRANSFER"
                          ? row.receiver
                          : formatAddress(row[col.key]);
                    if (isType || isStatus)
                      result = library[row[col.key]]
                        ? library[row[col.key]]
                        : row[col.key];
                    if (isGA) result = row.gaEnable ? "ON" : "OFF";
                    if (isUsed)
                      result = row[col.key] ? (
                        <CheckCircle color="primary" fontSize="small" />
                      ) : null;
                    if (isArray) result = row[col.key].toString();
                    if (isBool)
                      result = row[col.key] ? (
                        <span className="text-green">ACTIVE</span>
                      ) : (
                        <span className="text-red">INACTIVE</span>
                      );
                    if (isHotWallet) result = <HotWallet data={row} />;
                    if (isTransfer) {
                      if (!row.isDefault) {
                        result = "--/--";
                      }
                    }
                    if (isLevel) result = `F${row[col.key]}`;
                    if (isFeedToken)
                      result = (
                        <a
                          target="_blank"
                          href={`/feed/detail/${row.tokenAddress}_${row.tokenId}`}
                          rel="noreferrer"
                        >
                          #{row[col.key]}
                        </a>
                      );
                    if (isContent) {
                      result =
                        row[col.key].slice(0, 50) +
                        (row[col.key].length > 50 ? "..." : "");
                    }
                    if (isCount) {
                      result = row[col.key].length;
                    }
                    if (isImage) {
                      result = (
                        <img
                          src={_getImage(
                            `body_${row.name
                              .toLowerCase()
                              .replace(" ", "_")
                              .replace("-", "_")}.png`
                          )}
                          alt=""
                          height={25}
                          width={25}
                        />
                      );
                    }
                    if (isNFTImage) {
                      result = (
                        <img
                          src={`${baseUrl}/nft_${row.type.toLowerCase()}_${formatNftName(
                            row.name
                          )}_${row.level.toLowerCase()}.png`}
                          alt=""
                          height={25}
                          width={25}
                        />
                      );
                    }
                    if (isBoxDetail) {
                      result = row.box ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                          onClick={() => setSelectedBoxDetail(row.box)}
                          style={{ cursor: "pointer" }}
                        >
                          {row.box.tokenId}
                        </a>
                      ) : (
                        "--/--"
                      );
                    }

                    return (
                      <TableCell
                        key={colIndex}
                        className={col.key === "status" ? statusColor : ""}
                      >
                        <span>{result}</span>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => _handleSelectItem(row)}
                    >
                      <DetailsIcon fontSize="small" />
                    </IconButton>
                    {/* Has re-send for withdraw fail */}
                    {isResend && row.status !== "SUCCESS" && (
                      <IconButton
                        size="small"
                        onClick={() => _handleResendWithdraw(row)}
                      >
                        <SendIcon fontSize="small" />
                      </IconButton>
                    )}
                    {updateFields && (
                      <IconButton
                        size="small"
                        onClick={() => _handleEditItem(row)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                    {deleteEndpoint && (
                      <IconButton
                        size="small"
                        onClick={() => _handleDelete(row)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                    {reMintEndpoint && (
                      <IconButton
                        size="small"
                        onClick={() => _handleReMint(row)}
                      >
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    )}
                    {/* login user by token */}
                    {row.rank && checkScope("USER_ACCESS") && (
                      <IconButton
                        size="small"
                        onClick={() => _handleLogin(row.id)}
                      >
                        <ExitToAppIcon fontSize="small" />
                      </IconButton>
                    )}
                    {row.isDefault && (
                      <IconButton size="small">
                        <Check style={{ color: "green" }} fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          {data && (data.itemCount === 0 || data.items.length === 0) && (
            <TableRow>
              <TableCell colSpan={columns.length}>No records found</TableCell>
            </TableRow>
          )}
          {!data && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <CustomLoading />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ItemDetail
        data={selectedBoxDetail}
        _onClose={() => setSelectedBoxDetail(null)}
      />
    </>
  );
}

export default CustomTable;

function HotWallet({ data }) {
  const [balance, setBalance] = useState(null);

  const _getHotWallet = () => {
    get(
      `${ENDPOINT_GET_HOT_WALLET}?coin=${data.coin}&network=${data.network}`,
      (data) => setBalance(data)
    );
  };

  if (balance) {
    return balance.balance;
  } else {
    return (
      <Link onClick={_getHotWallet} to="#">
        Show hot wallet
      </Link>
    );
  }
}
