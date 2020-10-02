import React from "react";
import "./Header.css";
import img from "../img/path-3.png";

export const Header = (props) => {
  // function back() {
  //   props.history.push("/feeds");
  // }
  return (
    <div className="blue-background">
      <div className="your-feeds">
        <div className="feed-item-box">
          {props.backButton === true ? (
            <img alt="" className="Path-3" src={img} />
          ) : null}
          <div className="header-text">{props.text}</div>
        </div>
        <span className="feeds-logout" onClick={() => props.onClick()}>
          LOGOUT
        </span>
      </div>
    </div>
  );
};
