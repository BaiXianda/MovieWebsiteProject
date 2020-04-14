import axios from "axios";
import {
  GET_ERRORS,
  GET_EVENT,
  GET_EVENTS,
  DELETE_EVENT,
  GET_MOVIE,
} from "./types";

export const createEvent = (event, history) => async (dispatch) => {
  try {
    await axios.post("/api/event", event);
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

export const vote = (eventId, movieId) => async (dispatch) => {
  try {
    if (window.confirm("Are you sure to vote this movie?")) {
      const res = await axios.post(`/api/event/vote/${eventId}/${movieId}`);
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getWinner = (eventId) => async (dispatch) => {
  const res = await axios.get(`/api/event/winner/${eventId}`);
  dispatch({
    type: GET_MOVIE,
    payload: res.data,
  });
};

export const getEvents = (groupId) => async (dispatch) => {
  const res = await axios.get(`/api/event/all/${groupId}`);
  dispatch({
    type: GET_EVENTS,
    payload: res.data,
  });
};

export const getEvent = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/event/${id}`);
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
    await axios.delete(`/api/event/${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });
  }
};
