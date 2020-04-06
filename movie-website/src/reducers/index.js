import { combineReducers } from "redux";
import errorRedcuer from "./errorReducer";
import groupReducer from "./groupReducer";
import movieListReducer from "./movieListReducer";
import movieReducer from "./movieReducer";
import securityReducer from "./securityReducer";
import invitationReducer from "./invitationReducer";

export default combineReducers({
  errors: errorRedcuer,
  group: groupReducer,
  movieList: movieListReducer,
  movie: movieReducer,
  security: securityReducer,
  invitation: invitationReducer,
});
