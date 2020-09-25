import { USER_LOGIN, USER_LOGOUT } from "../constants/userLoginConstants";

function userLoginReducer(state = { LoggedInUser: {} }, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state.users, LoggedInUser: { userInfo: action.payload } };
    case USER_LOGOUT:
      return { ...state.users, LoggedInUser: {} };
    default:
      return state;
  }
}

export { userLoginReducer };
