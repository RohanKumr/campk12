import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./css/Feeds.css";
import { USER_LOGOUT } from "../constants/userLoginConstants";
// import { Redirect } from "react-router-dom";

export default function Feeds(props) {
  const [newPost, setNewPost] = useState();
  const users = useSelector((state) => state.userList.users);
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
  function getPost(event) {
    setNewPost(event.target.value);
  }
  function savePost() {
    console.log(newPost);
    dispatch();
    // addPost()
  }
  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="your-feeds">
            Your Feeds{" "}
            <span className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </span>
          </div>
        </div>
        <div className="post-container">
          <textarea className="post-textarea" onChange={getPost}>
            Write a Post...
          </textarea>
          <div className="feeds-post-button" onClick={savePost}>
            POST
          </div>
        </div>

        {users.map((user) => (
          <div className="feeds">
            <div className="feeds-user-info-box">
              <div className="profile-image"></div>
              <div className="feeds-user-info-box-right">
                <div>
                  <div className="user-name">{user.name}</div>
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
            <div className="feeds-text">{user.post}</div>
          </div>
        ))}

        {/* FEED STARTS HERE */}
        {/* <div className="feeds">
          <div className="feeds-user-info-box">
            <div className="profile-image"></div>
            <div className="feeds-user-info-box-right">
              <div>
                <div className="user-name">Nikhil Yadav</div>
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

          <div className="feeds-text">Today I won a car in a competition!</div>
        </div>
        <div className="feeds">
          <div className="feeds-user-info-box">
            <div className="profile-image"></div>
            <div className="feeds-user-info-box-right">
              <div>
                <div className="user-name">Shirai Subaru</div>
                <div className="user-addon-info-box">
                  <div className="user-addon-icon"></div>
                  <div className="user-addon-info">100</div>
                  <div className="user-addon-icon-2"></div>
                  <div className="user-addon-info">340</div>
                </div>
              </div>
              <div className="post-time">1d</div>
            </div>
          </div>

          <div className="feeds-text">
            Today I won a car in a competition! This is a sample of a longer
            post which has been written by a new person to demonstrate that the
            size of the feed box should be as long as the text
          </div>
        </div> */}
        {/* FEED ENDS HERE */}
      </div>
    </div>
  );
}
