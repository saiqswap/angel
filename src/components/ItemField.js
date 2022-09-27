import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../settings";
import { formatAddress_1 } from "../settings/format";
import { getAccessToken } from "../utils/auth";

function isFileImage(file) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}

const _handleUploadWeb3 = (e, callback) => {
  if (e.target.files.length > 0) {
    if (isFileImage(e.target.files[0])) {
      if (e.target.files[0].size < 5000000) {
        var fd = new FormData();
        fd.append("image", e.target.files[0]);
        fetch(`${API}/adm-api/v1/upload/file`, {
          headers: {
            Authorization: "bearer " + getAccessToken(),
          },
          method: "POST",
          body: fd,
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              callback(json.data.link);
            } else {
              console.log(json);
              toast.error("ERROR");
              return false;
            }
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      } else {
        toast.error("IMAGE_LARGE");
        return false;
      }
    } else {
      toast.error("IMAGE_CORRECT");
      return false;
    }
  } else {
    return false;
  }
};

export default function ItemField({
  data,
  defaultScopes,
  defaultData,
  defaultFilter,
  _handleCheck,
  ...props
}) {
  const { type, col, text, key, require, disabled, selectName } = data;
  const { setting, admin } = useSelector((state) => state);
  const { enums, scopes } = setting;
  const { roleList, contracts, mintingBoxes } = admin;
  const [imagePreview, setImagePreview] = useState(
    defaultData ? defaultData : ""
  );
  const [uploading, setUploading] = useState(false);
  const [properties, setProperties] = useState(
    defaultData
      ? defaultData
      : {
          body: "",
          skills_1: "",
          skills_2: "",
          skills_3: "",
          skills_4: "",
          skills_5: "",
          skills_6: "",
          stat: "",
          className: "",
        }
  );

  const [list, setList] = useState([]);

  //set list for select box
  useEffect(() => {
    if (enums && contracts) {
      let list = [];
      if (selectName === "Coin") {
        list = ["USDT", "BTC", "FIL", "INC", "BNB"];
      }
      if (selectName === "GAME_ITEM_TYPE") {
        list = ["ANGEL", "COSTUME", "MINION_PARTS"];
      }
      if (selectName === "GAME_ITEM_STATUS") {
        list = ["ACTIVE", "INACTIVE"];
      }
      if (selectName === "GAME_TYPE_LEVEL") {
        list = ["TIER_1", "TIER_2", "TIER_3", "TIER_4", "TIER_5"];
      }
      if (selectName === "NFT_TRANSACTION_STATUS") {
        list = enums.NftTransactionType;
      }

      // if (selectName === "Roles") {
      //   list = ["MASTER", "SUPPORT"];
      // }

      if (enums && enums[selectName]) {
        list = enums[selectName];
      }
      if (selectName === "Scopes" && scopes) list = scopes;
      if (selectName === "Roles") list = roleList;
      if (selectName === "Level") list = [`1`, `2`, `3`, `4`, `5`, `6`];
      if (selectName === "EQUIPMENT_TYPE") list = [`WEAPON`, `BODY_ARMOR`];
      if (selectName === "EQUIPMENT_RANK")
        list = [`NONE`, `D`, `C`, `B`, `A`, `S`];
      if (selectName === "BOX_TYPES")
        list = [
          `ANGEL`,
          `MINION_PARTS_COMMON`,
          `MINION_PARTS_EPIC`,
          `COSTUME_COMMON`,
          `COSTUME_EPIC`,
        ];
      if (selectName === "PAYMENT_CONTRACTS") {
        list = contracts;
      }
      if (mintingBoxes && selectName === "MINTING_BOX") {
        list = mintingBoxes;
      }
      if (selectName === "COMBO_TYPE") {
        list = enums.ComboType;
      }
      if (selectName === "LOCATION") {
        list = ["GLOBAL", "JAPAN"];
      }
      if (selectName === "MINTING_ROUND") {
        list = [0, 1, 2, 3];
      }
      setList(list);
    }
  }, [contracts, enums, mintingBoxes, roleList, scopes, selectName]);

  let defaultValue = "";
  if (defaultData || defaultData === 0) defaultValue = defaultData;
  if (defaultFilter && defaultFilter[key]) defaultValue = defaultFilter[key];

  const _handleUploadAvatar = async (e) => {
    setUploading(true);
    _handleUploadWeb3(e, (link) => {
      setImagePreview(link);
      setUploading(false);
    });
  };

  const _updateProperties = (key, link) => {
    const temp = {};
    temp.body = properties.body;
    temp.skills = properties.skills;
    temp.stat = properties.stat;
    temp[key] = link;
    setProperties(temp);
  };

  if (type === "input") {
    return (
      <Grid item xs={col ? col : 2}>
        <TextField
          label={text}
          variant="outlined"
          size="small"
          fullWidth
          name={key}
          required={require}
          defaultValue={defaultData}
          disabled={disabled}
          {...props}
        />
      </Grid>
    );
  } else if (type === "select") {
    console.log(defaultValue, list);
    return (
      <Grid item xs={col ? col : 2}>
        <TextField
          label={text}
          inputProps={{
            name: key,
          }}
          select
          variant="outlined"
          fullWidth
          size="small"
          defaultValue={defaultValue}
          required={require}
          disabled={disabled}
          {...props}
        >
          <MenuItem value="">
            <em>NONE</em>
          </MenuItem>
          {list.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  } else if (type === "SELECT_PAYMENT_CONTRACT") {
    return (
      <Grid item xs={col ? col : 2}>
        <TextField
          label={text}
          inputProps={{
            name: key,
          }}
          select
          variant="outlined"
          fullWidth
          size="small"
          defaultValue={defaultValue}
          required={require}
          disabled={disabled}
          {...props}
        >
          <MenuItem value="">
            <em>NONE</em>
          </MenuItem>
          {list.map((item, index) => (
            <MenuItem value={item.contractAddress} key={index}>
              {item.symbol} - {formatAddress_1(item.contractAddress, 18)}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    );
  } else if (type === "date") {
    return (
      <Grid item xs={col ? col : 2}>
        <TextField
          label={text}
          variant="outlined"
          size="small"
          fullWidth
          name={key}
          type="date"
          required={require}
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          {...props}
        />
      </Grid>
    );
  } else if (type === "date-time") {
    return (
      <Grid item xs={col ? col : 2}>
        <TextField
          label={text}
          variant="outlined"
          size="small"
          fullWidth
          name={key}
          type="datetime-local"
          required={require}
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
          {...props}
        />
      </Grid>
    );
  } else if (type === "checkbox") {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel component="legend">{text}</FormLabel>
          </Grid>
          {list.map((item, index) => (
            <Grid item xs={4} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={defaultScopes.includes(item)}
                    onChange={_handleCheck}
                    name={item}
                    size="small"
                    disabled={disabled}
                    {...props}
                  />
                }
                label={item}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  } else if (type === "MINTING_BOX") {
    return (
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormLabel component="legend">{text}</FormLabel>
          </Grid>
          {list.map((item, index) => (
            <Grid item xs={12} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={defaultScopes.includes(item.id.toString())}
                    onChange={_handleCheck}
                    name={item.id.toString()}
                    size="small"
                    disabled={disabled}
                    {...props}
                  />
                }
                label={`${item.boxType} - Round ${item.roundNumber} - Price ${item.unitPrice} ${item.paymentCurrency}`}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  } else if (type === "singleCheckbox") {
    return (
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name={key}
              size="small"
              {...props}
              defaultChecked={defaultData}
              disabled={disabled}
            />
          }
          label={text}
        />
      </Grid>
    );
  } else if (type === "file") {
    return (
      <Grid item xs={12}>
        <p>Avatar</p>
        <Paper variant="outlined">
          <Box p={2}>
            {imagePreview && (
              <div>
                <img
                  src={imagePreview}
                  alt=""
                  style={{
                    width: 300,
                  }}
                />
              </div>
            )}
            <Box mb={2} mt={2}>
              <TextField
                value={imagePreview}
                disabled
                variant="outlined"
                size="small"
                fullWidth
                label={text}
                name={key}
              />
            </Box>
            {uploading && <p>Uploading ...</p>}
            <input type="file" id="input" onChange={_handleUploadAvatar} />
          </Box>
        </Paper>
      </Grid>
    );
  } else if (type === "properties") {
    return (
      <>
        <Grid item xs={12}>
          <p>Properties</p>
          <Grid container spacing={2}>
            {[
              {
                label: "Body",
                key: "body",
              },
              {
                label: "Skill 1",
                key: "skill_1",
              },
              {
                label: "Skill 2",
                key: "skill_2",
              },
              {
                label: "Skill 3",
                key: "skill_3",
              },
              {
                label: "Skill 4",
                key: "skill_4",
              },
              {
                label: "Skill 5",
                key: "skill_5",
              },
              {
                label: "Skill 6",
                key: "skill_6",
              },
              {
                label: "Stat",
                key: "stat",
              },
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <PropertyInput
                  label={item.label}
                  _callback={(link) => _updateProperties(item.key, link)}
                  defaultData={properties[item.key]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label={"Class name"}
            defaultValue={properties.statName}
            onChange={(e) => _updateProperties("className", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            variant="outlined"
            size="small"
            fullWidth
            label={text}
            name={key}
            value={JSON.stringify(properties)}
          />
        </Grid>
      </>
    );
  } else return null;
}

const PropertyInput = ({ label, defaultData, _callback }) => {
  const [imagePreview, setImagePreview] = useState(
    defaultData ? defaultData : ""
  );
  const [uploading, setUploading] = useState(false);

  const _handleUpload = async (e) => {
    setUploading(true);
    _handleUploadWeb3(e, (link) => {
      setImagePreview(link);
      setUploading(false);
      _callback(link);
    });
  };

  return (
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Box p={2}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt=""
              style={{
                width: 300,
              }}
            />
          )}
          <Box mb={2} mt={2}>
            <TextField
              value={imagePreview}
              disabled
              variant="outlined"
              size="small"
              fullWidth
              label={label}
            />
          </Box>
          {uploading && <p>Uploading ...</p>}
          <input type="file" id="input" onChange={_handleUpload} />
        </Box>
      </Paper>
    </Grid>
  );
};
