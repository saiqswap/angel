import {
  FETCH_CONTRACTS,
  FETCH_PROFILE,
  FETCH_ROLE,
  FETCH_USER,
  FETCH_USER_LIST,
} from "../constants";

const initialState = {
  profile: null,
  userList: null,
  roleList: null,
  contracts: null,
  currentUser: null,
};

export const AdminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER:
      return { ...state, currentUser: payload };
    case FETCH_CONTRACTS:
      return { ...state, contracts: payload };
    case FETCH_ROLE:
      return { ...state, roleList: payload };
    case FETCH_USER_LIST:
      return { ...state, userList: payload };
    case FETCH_PROFILE:
      return { ...state, profile: payload };
    default:
      return { ...state };
  }
};
