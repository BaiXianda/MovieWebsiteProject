import { GET_MOVIELIST, GET_MOVIELISTS } from "../actions/types";

const initialState = {
  movieList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIELIST:
      return {
        ...state,
        movieList: action.payload
      };

    default:
      return state;
  }
}
