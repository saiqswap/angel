import {
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ENDPOINT_NFT_GET_LIST } from "../../constants/endpoint";
import { baseUrl, _getImage } from "../../settings";
import { post } from "../../utils/api";
import { formatNftName, _formatNameToLink } from "../../utils/format";

const CustomImage = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  background: "rgba(0, 0, 0, .4)",
  borderRadius: 3,
  objectFit: "contain",
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const MinionSkill = ({ data }) => {
  return (
    <div className="passive-skill">
      <div>
        <div>Skill: {data.properties.effect}</div>
        <CustomImage
          src={`${baseUrl}/effect_${_formatNameToLink(
            data.properties.effect
          )}.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default function MinionImages() {
  let [data, setData] = useState([]);

  useEffect(() => {
    post(
      ENDPOINT_NFT_GET_LIST,
      {
        page: 1,
        pageSize: 1000,
        filters: {
          category: "ROOT",
          type: "MINION_PARTS",
        },
      },
      (data) => setData(data.items)
    );
  }, []);

  const filteredArr = data.reduce((acc, current) => {
    const x = acc.find((item) => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <Grid container spacing={1}>
      {data &&
        filteredArr.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper variant="outlined">
              <Box p={1}>
                <Typography>{item.name.toUpperCase()}</Typography>
                <Divider />
                <CustomImage
                  src={_getImage(
                    `body_${item.name.toLowerCase().replace(" ", "_")}.png`
                  )}
                  key={index}
                />
                <CustomImage
                  src={_getImage(
                    `thumbnail_${item.name.toLowerCase().replace(" ", "_")}.png`
                  )}
                  alt=""
                  key={index}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Divider />
                <Grid container>
                  <Grid item xs={3}>
                    <div>{item.level}</div>
                    <CustomImage
                      src={`${baseUrl}/nft_minion_parts_${formatNftName(
                        item.name
                      )}_${item.level.toLowerCase()}.png`}
                      alt=""
                    />
                  </Grid>
                </Grid>
                <Divider />
                <MinionSkill data={item} />
              </Box>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}
