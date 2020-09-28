// import Cookie from "js-cookie";
import { ADD_POST } from "../constants/postsConstants";

const addPost = (user_id, newPost, name, gifUrl, image) => (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: { user_id, newPost, name, gifUrl, image },
  });
  //   Cookie.set("userInfo", JSON.stringify());
};

export { addPost };
