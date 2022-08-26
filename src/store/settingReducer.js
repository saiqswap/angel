import { FETCH_CONFIG, SWITCH_POPUP } from "../constants";

const initialState = {
  popupData: null,
  enums: null,
  scopes: null,
  dateTimeFormat: null,
  dateFormat: null,
};

export const SettingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CONFIG:
      return { ...state, ...payload };
    case SWITCH_POPUP:
      return { ...state, popupData: payload };
    default:
      return { ...state };
  }
};
