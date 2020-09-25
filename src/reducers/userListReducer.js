import { ADD_USER } from "../constants/userListConstants";
import data from "../data";

function userListReducer(state = { users: data.users }, action) {
  switch (action.type) {
    case ADD_USER:
      const newUser = action.payload;
      console.log("action reached");
      return { ...state, users: [...state.users, newUser] };
    default:
      return state;
  }
}

export { userListReducer };
