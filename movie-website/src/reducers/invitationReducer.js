import {
  GET_INVITATIONS,
  DELETE_INVITATION,
  GET_INVITATION,
} from "../actions/types";

const initialState = {
  invitations: [],
  invitation: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVITATIONS:
      return {
        ...state,
        invitations: action.payload,
      };

    case GET_INVITATION:
      return {
        ...state,
        invitation: state.invitations.filter(
          (invitation) => invitation.id !== action.payload
        ),
      };

    case DELETE_INVITATION:
      return {
        ...state,
        invitations: state.invitations.filter(
          (invitation) => invitation.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
