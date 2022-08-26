import { FETCH_CONFIG, SWITCH_POPUP } from "../constants";
import { ENDPOINT_GET_CONFIG } from "../constants/endpoint";
import { get } from "../utils/api";
import { isLoggedIn } from "../utils/auth";

export const _switchPopup = (data) => (dispatch) => {
  dispatch({
    type: SWITCH_POPUP,
    payload: data,
  });
};

export const _getConfig = () => (dispatch) => {
  if (isLoggedIn()) {
    get(ENDPOINT_GET_CONFIG, (data) =>
      dispatch({
        type: FETCH_CONFIG,
        payload: data,
      })
    );
  }
};
