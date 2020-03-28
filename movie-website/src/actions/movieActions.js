import axios from "axios";
import { GET_ERRORS } from "./types";

export const createMovieList = (id, movie, history) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/movie/${id}`, movie);
    history.push(`/groupBoard/movieListBoard/${id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
