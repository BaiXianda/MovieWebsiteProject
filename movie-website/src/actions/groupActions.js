import axios from "axios";
import { GET_ERRORS } from "./types";

export const createGroup = (group, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/group", group);
    history.pushState("/dashboard");
    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
