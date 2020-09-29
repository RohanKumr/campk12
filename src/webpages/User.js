import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import img from "./img/path-3.png";
import "./css/profile.css";
import greenIcon from "./img/group-5.png";
import coinIcon from "./img/coin@3x.png";

export default function User(props) {
  let userID = props.match.params.userId;

  const posts = useSelector((state) => state.postsList.posts);
  const dispatch = useDispatch();
  const currentUserPosts = posts.filter(
    (post) => post.user_id.toString() === userID.toString()
  );

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
      props.history.push("/campk12");
    }
    return () => {
      props.history.push("/campk12");
    };
  }, [userInfo, props]);
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">
            <div className="feed-item-box">
              <img alt="" onClick={back} className="Path-3" src={img} />
              <div>Profile</div>
            </div>
            <span className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </span>
          </div>
        </div>
        <div className="profile-container">
          {currentUserPosts[0].image ? (
            <img
              alt=""
              src={currentUserPosts[0].image}
              className="main-user-photo"
            />
          ) : (
            <div className="main-profile-photo"></div>
          )}
          <div className="main-profile-name">{currentUserPosts[0].name}</div>
          <div className="user-addon-info-box">
            <img alt="" className="user-addon-icon" src={greenIcon} />
            <div className="user-addon-info">100</div>
            <div className="Oval-cont">
              <div className="Oval"></div>
            </div>
            <img alt="" className="user-addon-icon" src={coinIcon} />
            <div className="user-addon-info">340</div>
          </div>
        </div>

        {/* FEED STARTS HERE */}
        {currentUserPosts.map((post) => (
          <div key={post.id} className="feeds">
            <div className="feeds-user-info-box">
              {currentUserPosts[0].image ? (
                <img
                  alt=""
                  src={currentUserPosts[0].image}
                  className="user-image"
                />
              ) : (
                <div className="profile-image"></div>
              )}
              <div className="feeds-user-info-box-right">
                <div>
                  <div className="user-name">{post.name}</div>
                  <div className="user-addon-info-box">
                    <img alt="" className="user-addon-icon" src={greenIcon} />
                    <div className="user-addon-info">100</div>
                    <div className="Oval-cont">
                      <div className="Oval"></div>
                    </div>
                    <img alt="" className="user-addon-icon" src={coinIcon} />
                    <div className="user-addon-info">340</div>
                  </div>
                </div>
                <div className="post-time">5h</div>
              </div>
            </div>
            <div className="feeds-text">{post.post}</div>

            <div>
              {post.gif && <img alt="" className="gif-image" src={post.gif} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
