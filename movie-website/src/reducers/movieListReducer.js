import {
  GET_MOVIELIST,
  GET_MOVIELISTS,
  DELETE_MOVIELIST
} from "../actions/types";

const initialState = {
  movieLists: [],
  movieList: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIELISTS:
      return {
        ...state,
        movieLists: action.payload
      };

    case GET_MOVIELIST:
      return {
        ...state,
        movieList: action.payload
      };

    case DELETE_MOVIELIST:
      return {
        ...state,
        movieLists: state.movieLists.filter(
          movieList => movieList.id !== action.payload
        )
      };

    default:
      return state;
  }
}
