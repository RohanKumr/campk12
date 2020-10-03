import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../constants/userLoginConstants";

import { Header } from "../../components/Header";
import { Feed } from "../../components/Feed";
import { ProfileCard } from "../../components/ProfileCard";

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
  // function back() {
  //   props.history.push("/feeds");
  // }
  function gotoFeed(feedId) {
    props.history.push("/feed/" + feedId);
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
          {...props}
          backButton={true}
          text="Profile"
          onClick={() => logoutButton()}
        />
        <ProfileCard currentUserPosts={currentUserPosts} />
        {/* FEED STARTS HERE */}
        {currentUserPosts.map((post) => (
          <Feed key={post.id} onClick={() => gotoFeed(post.id)} post={post} />
        ))}
      </div>
    </div>
  );
}
