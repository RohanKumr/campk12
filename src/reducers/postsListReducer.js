import { ADD_POST } from "../constants/postsConstants";
import data from "../data";
import { v4 as uuidv4 } from "uuid";

function postsListReducer(state = { posts: data.posts }, action) {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: uuidv4(),
        user_id: action.payload.user_id,
        post: action.payload.newPost,
        name: action.payload.name,
        gif: action.payload.gifUrl,
        image: action.payload.image,
      };
      console.log("action reached");
      return { ...state, posts: [newPost, ...state.posts] };
    default:
      return state;
  }
}

export { postsListReducer };
