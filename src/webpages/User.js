import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import img from "./img/path-3.png";
import "./css/profile.css";

export default function User(props) {
  let userID = props.match.params.userId;

  const posts = useSelector((state) => state.postsList.posts);
  const dispatch = useDispatch();
  const currentUserPosts = posts.filter((post) => post.user_id == userID);

  function logoutButton() {
    dispatch({ type: USER_LOGOUT });
  }
  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );

  function back() {
    props.history.push("/feeds");
  }
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">
            <div className="feed-item-box">
              <img onClick={back} className="Path-3" src={img} />
              <div>Profile</div>
            </div>
            <span className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </span>
          </div>
        </div>
        <div className="profile-container">
          <div className="main-profile-photo"></div>
          <div className="main-profile-name">{currentUserPosts[0].name}</div>
          <div className="user-addon-info-box">
            <div className="user-addon-icon"></div>
            <div className="user-addon-info">100</div>
            <div className="user-addon-icon-2"></div>
            <div className="user-addon-info">340</div>
          </div>
        </div>

        {/* FEED STARTS HERE */}
        {currentUserPosts.map((post) => (
          <div
            className="feeds"
            //   onClick={() => gotoFeed(post.id)}
          >
            <div className="feeds-user-info-box">
              <div className="profile-image"></div>
              <div className="feeds-user-info-box-right">
                <div>
                  <div className="user-name">{post.name}</div>
                  <div className="user-addon-info-box">
                    <div className="user-addon-icon"></div>
                    <div className="user-addon-info">100</div>
                    <div className="user-addon-icon-2"></div>
                    <div className="user-addon-info">340</div>
                  </div>
                </div>
                <div className="post-time">5h</div>
              </div>
            </div>
            <div className="feeds-text">{post.post}</div>

            <div>
              {post.gif && (
                <img className="gif-image" src={post.gif} alt="Selected GIF" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
