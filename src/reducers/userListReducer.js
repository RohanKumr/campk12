import { ADD_USER } from "../constants/userListConstants";
import data from "../data";
import { v4 as uuidv4 } from "uuid";

function userListReducer(state = { users: data.users }, action) {
  switch (action.type) {
    case ADD_USER:
      const newUser = {
        _id: uuidv4(),
        email: action.payload.email,
        name: action.payload.name,
        password: action.payload.password,
      };
      console.log("action reached");
      return { ...state, users: [...state.users, newUser] };
    default:
      return state;
  }
}

export { userListReducer };
