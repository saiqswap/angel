import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { ACTIVE, BLOCK, INTERNAL, NEW } from "../constants";
import { formatAddress, formatNumber, getLinkHash } from "../settings/format";
import { library } from "../settings/library";
import LinkToEmail from "./LinkToEmail";
import DetailsIcon from "@material-ui/icons/Details";
import CustomLoading from "./CustomLoading";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Check, Close, RestorePage } from "@material-ui/icons";
import { get } from "../utils/api";
import { ENDPOINT_GET_HOT_WALLET } from "../constants/endpoint";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { checkScope } from "../utils/auth";
import RefreshIcon from "@material-ui/icons/Refresh";
import { _getImage } from "../settings";

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
}) {
  const [rows, setRows] = useState(null);

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

  return (
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
                  } = col;
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
                  if (isHash) {
                    row.type === INTERNAL
                      ? (result = (
                          <LinkToEmail
                            id={
                              col.userId === "senderId" ? row[col.userId] : null
                            }
                            email={row[col.key]}
                          />
                        ))
                      : (result = getLinkHash(row));
                  }
                  if (isAmount) result = formatNumber(row[col.key]);
                  if (isTime)
                    result = moment(row[col.key]).format("YYYY-MM-DD HH:mm:ss");
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
                  {updateFields && (
                    <IconButton
                      size="small"
                      onClick={() => _handleEditItem(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {deleteEndpoint && (
                    <IconButton size="small" onClick={() => _handleDelete(row)}>
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                  {reMintEndpoint && (
                    <IconButton size="small" onClick={() => _handleReMint(row)}>
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
