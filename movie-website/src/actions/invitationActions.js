import axios from "axios";
import { GET_INVITATIONS, ACCEPT_INVITATION, DELETE_INVITATION } from "./types";

export const getInvitations = () => async (dispatch) => {
  const res = await axios.get("/api/user/invitations");
  dispatch({
    type: GET_INVITATIONS,
    payload: res.data,
  });
};

export const accpetInvitation = (id) => async (dispatch) => {
  await axios.post(`/api/group/addUser/${id}`);
  dispatch({
    type: ACCEPT_INVITATION,
    payload: id,
  });
};

export const deleteInvitation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this project?")) {
    await axios.delete(`/api/user/invitation/${id}`);
    dispatch({
      type: DELETE_INVITATION,
      payload: id,
    });
  }
};
