import {
  FETCH_CONTRACTS,
  FETCH_PROFILE,
  FETCH_ROLE,
  FETCH_USER_LIST,
} from "../constants";
import {
  ENDPOINT_GET_PROFILE,
  ENDPOINT_GET_ROLE,
  ENDPOINT_POST_USER_LIST,
} from "../constants/endpoint";
import { get, post } from "../utils/api";

export const _getProfile = () => (dispatch) => {
  get(ENDPOINT_GET_PROFILE, (data) =>
    dispatch({
      type: FETCH_PROFILE,
      payload: data,
    })
  );
};

export const _getUserList = (page, pageSize, filters) => (dispatch) => {
  post(
    ENDPOINT_POST_USER_LIST,
    {
      page,
      pageSize,
      filters,
    },
    (data) =>
      dispatch({
        type: FETCH_USER_LIST,
        payload: data,
      })
  );
};

export const _getRoles = () => (dispatch) => {
  post(
    ENDPOINT_GET_ROLE,
    {
      page: 1,
      pageSize: 100,
      filters: {},
    },
    (data) => {
      const temp = [];
      data.items.map((item) => temp.push(item.name));
      dispatch({
        type: FETCH_ROLE,
        payload: temp,
      });
    }
  );
};

export const _getContracts = () => (dispatch) => {
  post(
    `/adm-api/v1/config/contract/list`,
    {},
    (data) =>
      dispatch({
        type: FETCH_CONTRACTS,
        payload: data.items,
      }),
    (error) => console.error(error)
  );
};
