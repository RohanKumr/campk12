import { ADD_USER } from "../constants/userListConstants";

export const userActions = (user) => (dispatch, getState) => {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
};
