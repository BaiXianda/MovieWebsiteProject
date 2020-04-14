import axios from "axios";
import { GET_ERRORS, GET_GROUPS, GET_GROUP, DELETE_GROUP } from "./types";

export const createGroup = (group, history) => async (dispatch) => {
  try {
    await axios.post("/api/group", group);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getGroups = () => async (dispatch) => {
  const res = await axios.get("/api/group/groups");
  dispatch({
    type: GET_GROUPS,
    payload: res.data,
  });
};

export const getGroup = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/group/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this group?")) {
    await axios.delete(`/api/group/${id}`);
    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });
  }
};

export const inviteUser = (inviation, history) => async (dispatch) => {
  try {
    await axios.post("/api/group/inviteUser", inviation);
    history.push(`/groupBoard/${inviation.groupId}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
