import SearchHigherComponent from "../../components/SearchHigherComponent";
import { Filter } from "../../settings";
import {
  ENDPOINT_DELETE_CANCEL_WITHDRAW,
  ENDPOINT_POST_WITHDRAW_HISTORY,
  ENDPOINT_PUT_APPROVE_WITHDRAW,
  ENDPOINT_PUT_BROADCAST_WITHDRAW,
  ENDPOINT_PUT_UPDATE_STATUS_WITHDRAW,
} from "../../constants/endpoint";
import { Button, Divider, Grid, MenuItem, TextField } from "@material-ui/core";
import { put, _delete } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { _switchPopup } from "../../actions/settingActions";
import { useState } from "react";
import { checkScope } from "../../utils/auth";

const columns = [
  {
    key: "id",
    label: "ID",
    isId: true,
  },
  {
    key: "email",
    label: "Email",
    isEmail: true,
    userId: "userId",
  },
  {
    key: "amount",
    label: "Amount",
    isAmount: true,
  },
  {
    key: "asset",
    label: "Asset",
    isStatus: true,
  },
  {
    key: "receiverAddress",
    label: "Address",
    isAddress: true,
  },
  {
    key: "txId",
    label: "Hash",
    isHash: true,
  },
  {
    key: "status",
    label: "Status",
    isStatus: true,
  },
  {
    key: "createdTime",
    label: "Time",
    isTime: true,
  },
];

const filterBy = [
  new Filter({
    key: "from",
    type: "date",
    text: "From date",
  }),
  new Filter({
    key: "to",
    type: "date",
    text: "To date",
  }),
  new Filter({
    key: "id",
    type: "input",
    text: "Withdraw ID",
  }),
  new Filter({
    key: "email",
    type: "input",
    text: "Email",
  }),
  new Filter({
    key: "username",
    type: "input",
    text: "Username",
  }),
  new Filter({
    key: "type",
    type: "select",
    text: "Type",
    selectName: "TransferType",
  }),
  new Filter({
    key: "asset",
    type: "select",
    text: "Asset",
    selectName: "Coin",
  }),
  new Filter({
    key: "txId",
    type: "input",
    text: "Hash",
  }),
  new Filter({
    key: "wallet",
    type: "input",
    text: "Wallet",
  }),
];

function SpecialComponent({ ids, _reload }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const _handleApprove = () => {
    dispatch(
      _switchPopup({
        title: "Approve for withdraws",
        content: "Are you sure for this action",
        _handleSubmit: () => {
          put(
            ENDPOINT_PUT_APPROVE_WITHDRAW,
            {
              ids,
            },
            () => {
              toast.success("Approved");
              _reload();
            }
          );
        },
      })
    );
  };

  const _handleBroadcast = () => {
    dispatch(
      _switchPopup({
        title: "Broadcast for withdraws",
        content: "Are you sure for this action",
        _handleSubmit: () => {
          put(
            ENDPOINT_PUT_BROADCAST_WITHDRAW,
            {
              ids,
            },
            () => {
              toast.success("Broadcasted");
              _reload();
            }
          );
        },
      })
    );
  };

  const _handleCancel = () => {
    dispatch(
      _switchPopup({
        title: "Cancel for withdraws",
        content: "Are you sure for this action",
        _handleSubmit: () => {
          _delete(
            ENDPOINT_DELETE_CANCEL_WITHDRAW,
            {
              ids,
            },
            () => {
              toast.success("Cancelled");
              _reload();
            }
          );
        },
      })
    );
  };

  const _handleUpdateStatus = () => {
    dispatch(
      _switchPopup({
        title: "Update status for withdraws",
        content: "Are you sure for this action",
        _handleSubmit: () => {
          put(
            ENDPOINT_PUT_UPDATE_STATUS_WITHDRAW,
            {
              ids,
              status,
            },
            () => {
              toast.success("Updated");
              _reload();
            }
          );
        },
      })
    );
  };

  return (
    checkScope("FUND_WRITE") && (
      <Grid
        container
        alignItems="center"
        spacing={1}
        style={{ padding: "30px 16px" }}
      >
        <Grid item>
          <Button
            variant="contained"
            disabled={ids.length === 0}
            onClick={_handleApprove}
          >
            Approve
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={ids.length === 0}
            onClick={_handleCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={ids.length === 0}
            onClick={_handleBroadcast}
          >
            Broadcast
          </Button>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          style={{ margin: "0px 10px" }}
        />
        <Grid item>
          <TextField
            select
            label="Select status"
            variant="outlined"
            size="small"
            style={{
              width: 200,
            }}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "WAITING_CONFIRM",
              "PENDING",
              "APPROVED",
              "CONFORMING",
              "CONFIRMED",
              "CANCELED",
            ].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={ids.length === 0 || status === ""}
            onClick={_handleUpdateStatus}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    )
  );
}

export default SearchHigherComponent({
  endpoint: ENDPOINT_POST_WITHDRAW_HISTORY,
  // exportLink: "/user-service/user/export",
  title: "Pending withdrawals",
  columns,
  filterBy,
  SpecialComponent,
  showCheckbox: true,
  defaultFilter: {
    status: "PENDING",
  },
});
