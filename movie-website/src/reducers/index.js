import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import movieListReducer from "./movieListReducer";

export default combineReducers({
  errors: errorReducer,
  movieList: movieListReducer
});
