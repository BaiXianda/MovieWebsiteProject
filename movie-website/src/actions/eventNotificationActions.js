import axios from "axios";
import { GET_EVENTNOTIFICATIONS, DELETE_EVENTNOTIFICATION } from "./types";

export const getEventNotifications = () => async (dispatch) => {
  const res = await axios.get("/api/user/eventNotifications");
  dispatch({
    type: GET_EVENTNOTIFICATIONS,
    payload: res.data,
  });
};

export const deleteEventNotification = (id) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this notification?")) {
    await axios.delete(`/api/user/eventNotification/${id}`);
    dispatch({
      type: DELETE_EVENTNOTIFICATION,
      payload: id,
    });
  }
};
