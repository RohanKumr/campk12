import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../constants/userLoginConstants";
import img from "../../img/path-3.png";
import "./profile.css";
import greenIcon from "../../img/group-5@3x.png";
import coinIcon from "../../img/coin@3x.png";
import { Header } from "../../components/Header";

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

  //Logged in User
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

    return () => {};
  }, [userInfo, props]);
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <Header
          backButton={true}
          text="Profile"
          onClick={() => logoutButton()}
        />
        <div className="profile-container">
          {currentUserPosts[0] && currentUserPosts[0].image ? (
            <img
              alt=""
              src={currentUserPosts[0].image}
              className="main-user-photo"
            />
          ) : (
            <div className="main-profile-photo"></div>
          )}
          <div className="main-profile-name">
            {currentUserPosts[0] && currentUserPosts[0].name}
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

        {/* FEED STARTS HERE */}
        {currentUserPosts.map((post) => (
          <div key={post.id} className="feeds">
            <div className="feeds-user-info-box">
              {currentUserPosts[0] && currentUserPosts[0].image ? (
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
