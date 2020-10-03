import "./Feed.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../constants/userLoginConstants";
import { Header } from "../../components/Header";
import { Feed } from "../../components/Feed";

export default function FeedContainer(props) {
  const posts = useSelector((state) => state.postsList.posts);
  const post = posts.find((post) => post.id === props.match.params.feedId);

  //Fetch logged in user here
  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/campk12");
    }
    return () => {};
  }, [userInfo, props]);

  function logoutButton() {
    dispatch({ type: USER_LOGOUT });
  }

  //USER ID PASSED HERE
  function gotoUser() {
    props.history.push("/user/" + post.user_id);
  }

  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <Header
          {...props}
          backButton={true}
          text="Feed"
          onClick={() => {
            logoutButton();
          }}
        />

        <div className="feed-top">
          <Feed onClick={() => gotoUser(post.id)} post={post} />
        </div>
      </div>
    </div>
  );
}
