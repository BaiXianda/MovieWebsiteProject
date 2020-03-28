import { combineReducers } from "redux";
import errorRedcuer from "./errorReducer";
import groupReducer from "./groupReducer";
import movieListReducer from "./movieListReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
  errors: errorRedcuer,
  group: groupReducer,
  movieList: movieListReducer,
  movie: movieReducer
});
