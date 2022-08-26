import {
  AppBar,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ItemField from "./ItemField";
import { post, put } from "../utils/api";
import { toast } from "react-toastify";
import { _switchPopup } from "../actions/settingActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
export default function ItemCreate({
  open,
  createFields,
  updateFields,
  updateEndpoint,
  type,
  defaultData,
  updateBy,
  _onReload,
  _onClose,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [defaultScopes, setDefaultScopes] = useState([]);

  useEffect(() => {
    if (defaultData.scopes) {
      setDefaultScopes(defaultData.scopes);
    }
  }, [defaultData.scopes]);

  const fields = type === "update" ? updateFields : createFields;

  const _handleCreate = (e) => {
    e.preventDefault();
    const body = {};
    try {
      fields.forEach((element) => {
        if (element.type === "checkbox") {
          body[element.key] = defaultScopes;
        } else if (element.type === "singleCheckbox") {
          const checked = e.target[element.key].checked;
          body[element.key] = checked;
        } else if (element.type === "properties") {
          const value = e.target[element.key].value;
          body[element.key] = JSON.parse(value);
        } else {
          const value = e.target[element.key].value.trim();
          if (element.require && value === "") {
            throw toast.error("Please enter all the information ... !!!");
          } else {
            body[element.key] = value;
          }
        }
      });
      setLoading(true);
      dispatch(
        _switchPopup({
          title: "Notification",
          content: "Are you for this action",
          _handleSubmit: () => {
            if (type === "update") {
              body[updateBy ? updateBy : "id"] =
                defaultData[updateBy ? updateBy : "id"];
              put(
                updateEndpoint,
                body,
                () => {
                  toast.success("Updated");
                  setLoading(false);
                  _onClose();
                  _onReload();
                },
                (error) => {
                  setLoading(false);
                  toast.error(error.code + ": " + error.msg);
                }
              );
            } else {
              post(
                updateEndpoint,
                body,
                () => {
                  toast.success("Created");
                  setLoading(false);
                  _onClose();
                  _onReload();
                },
                (error) => {
                  setLoading(false);
                  toast.error(error.code + ": " + error.msg);
                }
              );
            }
          },
          _handleCancel: () => setLoading(false),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const _handleCheck = (e) => {
    const { checked, name } = e.target;
    let temp = [...defaultScopes];
    if (checked) {
      temp.push(name);
      setDefaultScopes(temp);
    } else {
      temp = temp.filter((item) => item !== name);
      setDefaultScopes(temp);
    }
  };

  return (
    <Drawer anchor="right" open={open}>
      <div className="item-detail">
        <div>
          <AppBar position="sticky">
            <Grid container alignItems="center">
              <Grid item>
                <IconButton onClick={_onClose} disabled={loading}>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1">Back</Typography>
              </Grid>
            </Grid>
          </AppBar>
          <form style={{ padding: 16 }} onSubmit={_handleCreate} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {type === "update" ? "Update item" : "Add new item"}
                </Typography>
              </Grid>
              {fields.map((item, index) => (
                <ItemField
                  data={item}
                  key={index}
                  defaultScopes={defaultScopes}
                  _handleCheck={_handleCheck}
                  defaultData={defaultData[item.key]}
                />
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Drawer>
  );
}
