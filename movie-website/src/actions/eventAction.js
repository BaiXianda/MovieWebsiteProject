import axios from "axios";
import { GET_ERRORS, GET_EVENT, GET_EVENTS, DELETE_EVENT } from "./types";

export const createEvent = (event, history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/event", event);
    history.push(`/groupBoard/${event.eventGroupId}`);
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

export const getEvents = (groupId) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/api/event/all/${groupId}`);
  dispatch({
    type: GET_EVENTS,
    payload: res.data,
  });
};

export const getEvent = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/event/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this event?")) {
    await axios.delete(`http://localhost:8080/api/event/${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });
  }
};
