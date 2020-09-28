import { ADD_POST } from "../constants/postsConstants";

const addPost = (user_id, newPost, name, gifUrl, image) => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: { user_id, newPost, name, gifUrl, image },
  });
};

export { addPost };
