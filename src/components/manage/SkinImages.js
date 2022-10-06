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

const SkinPassiveSkin = ({ data }) => {
  return (
    <div className="passive-skill">
      <div>
        <CustomImage
          alt=""
          src={`${baseUrl}/effect_${_formatNameToLink(
            data.properties.costumeEffect
          )}.png`}
        />
        <Typography>{data.properties.costumeEffect}</Typography>
        {/* <Box sx={{ height: 100 }}>
          {data.properties.passiveSkills.map((item, i) => (
            <Typography variant="caption" key={i}>{`- ${item}`}</Typography>
          ))}
        </Box> */}
      </div>
    </div>
  );
};

export default function SkinImages() {
  let [data, setData] = useState([]);

  useEffect(() => {
    post(
      ENDPOINT_NFT_GET_LIST,
      {
        page: 1,
        pageSize: 1000,
        filters: {
          category: "ROOT",
          type: "COSTUME",
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
                  alt=""
                  key={index}
                />
                <Divider />
                <Grid container>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Grid item xs={4}>
                      <CustomImage
                        src={`${baseUrl}/nft_costume_${formatNftName(
                          item.name
                        )}_tier_${n}.png`}
                        alt=""
                      />
                    </Grid>
                  ))}
                </Grid>
                <Divider />
                <SkinPassiveSkin data={item} />
              </Box>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}
