import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, Close, Edit, Remove } from "@material-ui/icons";

export default function AddListComponent({ data, title, _handleSave }) {
  const [list, setList] = useState(data ? data : []);
  const [editing, setEditing] = useState(false);

  const _addNew = () => {
    const temp = [...list];
    temp.push("");
    setList(temp);
  };

  const _onChange = (e) => {
    const temp = [...list];
    temp[e.target.id] = e.target.value;
    setList(temp);
  };

  const _onRemove = (index) => {
    const temp = [...list];
    temp.splice(index, 1);
    setList(temp);
  };

  if (editing) {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{title}</Typography>
            </Grid>
            {list.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box display="flex" alignItems="center">
                  <TextField
                    value={item}
                    label={`Skill ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    size="small"
                    key={index}
                    onChange={_onChange}
                    id={index}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      _onRemove(index);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={_addNew}
                style={{ marginRight: 12 }}
              >
                <Add />
              </Button>
              <Button
                onClick={() => {
                  _handleSave(list);
                  setEditing(false);
                }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  } else {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{title}</Typography>
            </Grid>
            {list.map((item, index) => (
              <Grid item xs={12} kye={index}>
                Skill {index + 1}: {item}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
}
