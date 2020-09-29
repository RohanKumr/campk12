import "./css/Feed.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import img from "./img/path-3.png";
import greenIcon from "./img/group-5.png";
import coinIcon from "./img/coin@3x.png";

export default function Feed(props) {
  const posts = useSelector((state) => state.postsList.posts);
  const post = posts.find((post) => post.id === props.match.params.feedId);

  const userImage = post.image;
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
              <img alt="" onClick={back} className="Path-3" src={img} />
              <div>Feed Item</div>
            </div>
            <span className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </span>
          </div>
        </div>
        <div onClick={gotoUser} className="feed-container">
          <div className="feed">
            <div className="feeds-user-info-box">
              {userImage ? (
                <img alt="" src={userImage} className="user-image" />
              ) : (
                <div className="profile-image"></div>
              )}
              <div className="feeds-user-info-box-right">
                <div>
                  <div onClick={gotoUser} className="user-name">
                    {post.name}
                  </div>
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
            <div>{post.gif && <img alt="" src={post.gif} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
