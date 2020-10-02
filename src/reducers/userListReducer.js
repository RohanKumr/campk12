import { ADD_USER } from "../constants/userListConstants";
import data from "../store/data";
import { v4 as uuidv4 } from "uuid";

function userListReducer(state = { users: data.users }, action) {
  switch (action.type) {
    case ADD_USER:
      let lowerCasedUser;
      if (action.payload.email) {
        lowerCasedUser = action.payload.email.toLowerCase();
      }

      const newUser = {
        _id: uuidv4(),
        email: lowerCasedUser,
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
