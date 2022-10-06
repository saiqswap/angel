import {
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ENDPOINT_NFT_GET_LIST } from "../../constants/endpoint";
import { baseUrl } from "../../settings";
import { post } from "../../utils/api";
import { formatNftName } from "../../utils/format";

const CustomImage = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  background: "rgba(0, 0, 0, .4)",
  borderRadius: 3,
  objectFit: "contain",
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const AngelSkill = ({ data }) => {
  return (
    <>
      <Grid container className="angel-skill">
        {data.properties.skills.map((item, index) => (
          <Grid item xs={4} key={index}>
            <CustomImage
              src={`${baseUrl}/skill_${formatNftName(
                data.name
              )}_${formatNftName(item)}.png`}
              alt=""
            />
            <div>{item}</div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default function AngelImages() {
  let [data, setData] = useState([]);

  useEffect(() => {
    post(
      ENDPOINT_NFT_GET_LIST,
      {
        page: 1,
        pageSize: 1000,
        filters: {
          category: "ROOT",
          type: "ANGEL",
        },
      },
      (data) => {
        const filteredAngelArr = data.items.reduce((acc, current) => {
          const x = acc.find((item) => item.name === current.name);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setData(filteredAngelArr);
      }
    );
  }, []);

  return (
    <Grid container spacing={2}>
      {data?.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper variant="outlined">
            <Box p={1}>
              <Typography>{item.name}</Typography>
              <Divider />
              <Grid container>
                <Grid item xs={4}>
                  <CustomImage
                    src={`${baseUrl}/body_${formatNftName(item.name)}.png`}
                    alt=""
                  />
                </Grid>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Grid item xs={4}>
                    <CustomImage
                      src={`${baseUrl}/nft_angel_${formatNftName(
                        item.name
                      )}_tier${n}.png`}
                      alt=""
                    />
                  </Grid>
                ))}
                <Grid item xs={4}>
                  <CustomImage
                    src={`${baseUrl}/class_${item.properties.class.toLowerCase()}.png`}
                    alt=""
                  />
                  <div>{item.properties.class}</div>
                </Grid>
              </Grid>
              <Divider />
              <AngelSkill data={item} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
