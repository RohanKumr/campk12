import React from "react";
import greenIcon from "../img/group-5@3x.png";
import coinIcon from "../img/coin@3x.png";
import "./profileCard.css";

export const ProfileCard = (props) => {
  const { currentUserPosts } = props;
  return (
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
  );
};
