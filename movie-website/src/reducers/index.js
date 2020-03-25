import { combineReducers } from "redux";
import errorRedcuer from "./errorReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  errors: errorRedcuer,
  group: groupReducer
});
