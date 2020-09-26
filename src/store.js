import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userListReducer } from "./reducers/userListReducer";
import { userLoginReducer } from "./reducers/userLoginReducer";
import { postsListReducer } from "./reducers/postsListReducer";
// import data from "./data";
// import { Cookie } from "js-cookie";
// const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {};
const reducer = combineReducers({
  userList: userListReducer,
  userLoginDetails: userLoginReducer,
  postsList: postsListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
