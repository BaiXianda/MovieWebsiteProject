import axios from "axios";
import { GET_ERRORS, GET_MOVIES, DELETE_MOVIE, GET_MOVIE } from "./types";

export const createMovie = (id, movie, history) => async dispatch => {
  try {
    await axios.post(`http://localhost:8080/api/movie/${id}`, movie);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push(`/groupBoard/movieListBoard/${id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getMovies = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/movie/all/${id}`);
    dispatch({
      type: GET_MOVIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getMovie = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/movie/${id}`);
    dispatch({
      type: GET_MOVIE,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteGroup = id => async dispatch => {
  if (window.confirm("Are you sure to delete this project?")) {
    await axios.delete(`http://localhost:8080/api/movie/${id}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: id
    });
  }
};
