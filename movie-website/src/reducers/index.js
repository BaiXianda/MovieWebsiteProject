import { combineReducers } from "redux";
import errorRedcuer from "./errorReducer";
import groupReducer from "./groupReducer";
import movieListReducer from "./movieListReducer";

export default combineReducers({
  errors: errorRedcuer,
  group: groupReducer,
  movieList: movieListReducer
});
