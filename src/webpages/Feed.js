import "./css/Feed.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import { back_logo } from "./img/path-3.png";
import img from "./img/path-3.png";

export default function Feed(props) {
  const posts = useSelector((state) => state.postsList.posts);
  const post = posts.find((post) => post.id == props.match.params.feedId);

  //FEED ID FROM URL BY FEEDS
  const currentFeedId = props.match.params.feedId;

  //Fetch logged in user here
  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  function logoutButton() {
    dispatch({ type: USER_LOGOUT });
  }
  function back() {
    props.history.push("/feeds");
  }

  //USER ID PASSED HERE
  function gotoUser() {
    props.history.push("/user/" + post.user_id);
  }

  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">
            <div className="feed-item-box">
              <img onClick={back} className="Path-3" src={img} />
              <div>Feed Item</div>
            </div>
            <span className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </span>
          </div>
        </div>
        <div className="feed-container">
          <div className="feed">
            <div className="feeds-user-info-box">
              <div className="profile-image"></div>
              <div className="feeds-user-info-box-right">
                <div>
                  <div onClick={gotoUser} className="user-name">
                    {post.name}
                  </div>
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
            <div>{post.gif && <img src={post.gif} alt="Selected GIF" />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
