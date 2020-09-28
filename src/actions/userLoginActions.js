import { USER_LOGIN } from "../constants/userLoginConstants";
import Cookie from "js-cookie";

const signin = (existingUser) => (dispatch) => {
  dispatch({ type: USER_LOGIN, payload: existingUser });
  Cookie.set("userInfo", JSON.stringify(existingUser));
};

export { signin };
