import {
  GET_EVENTNOTIFICATIONS,
  DELETE_EVENTNOTIFICATION,
} from "../actions/types";

const initialState = {
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTNOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    case DELETE_EVENTNOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
