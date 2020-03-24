import axios from "axios";
import { GET_ERRORS, GET_MOVIELIST, GET_MOVIELISTS } from "./types";

export const getMovieLists = () => async dispatch => {
  const res = await axios.get("api/movielist/all");
  dispatch({
    types: GET_MOVIELISTS,
    payload: res.data
  });
};

export const getMovieList = id => async dispatch => {
  const res = await axios.get(`api/movielist/${id}`);
  dispatch({
    types: GET_MOVIELIST,
    payload: res.data
  });
};
