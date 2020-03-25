import { combineReducers } from "redux";
import errorRedcuer from "./errorReducer";

export default combineReducers({
  errors: errorRedcuer
});
