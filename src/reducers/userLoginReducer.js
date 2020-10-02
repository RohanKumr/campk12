import { USER_LOGIN, USER_LOGOUT } from "../constants/userLoginConstants";

function userLoginReducer(state = { LoggedInUser: {}, Age: 20 }, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state.users, LoggedInUser: { userInfo: action.payload } };
    case USER_LOGOUT:
      return { ...state.users, LoggedInUser: {} };
    case "AGE_UP":
      return { ...state, Age: ++state.Age };

    case "AGE_DOWN":
      return { ...state, Age: --state.Age };

    default:
      return state;
  }
}

export { userLoginReducer };
