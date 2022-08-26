import { combineReducers } from "redux";
import { AdminReducer } from "./adminReducer";
import { SettingReducer } from "./settingReducer";

const rootReducer = combineReducers({
  admin: AdminReducer,
  setting: SettingReducer
});

export default rootReducer;
