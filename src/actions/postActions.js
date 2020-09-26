// import Cookie from "js-cookie";
import { ADD_POST } from "../constants/postsConstants";

const addPost = (newPost, id, name, gifUrl) => (dispatch) => {
  dispatch({ type: ADD_POST, payload: { newPost, id, name, gifUrl } });
  //   Cookie.set("userInfo", JSON.stringify());
};

export { addPost };
