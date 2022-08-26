import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { _switchPopup } from "../actions/settingActions";

export default function CustomDialog() {
  const { setting } = useSelector((state) => state);
  const { popupData } = setting;
  const dispatch = useDispatch();

  const _handleCancel = () => {
    dispatch(_switchPopup(null));
    if (popupData._handleCancel) popupData._handleCancel();
  };
  const _handleOk = () => {
    popupData._handleSubmit();
    dispatch(_switchPopup(null));
  };

  return (
    <Dialog
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={popupData !== null}
    >
      <DialogTitle id="confirmation-dialog-title">
        {popupData && popupData.title}&nbsp;
      </DialogTitle>
      <DialogContent dividers>
        {popupData && popupData.content + " ?"}&nbsp;
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={_handleCancel}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button onClick={_handleOk} variant="outlined" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
