import React from "react";
import greenIcon from "../img/group-5.png";
import coinIcon from "../img/coin@3x.png";

export const MultipleFeeds = (props) => {
  const { post } = props;
  return (
    <>
      <div
        key={props.post.id}
        ref={props.lastElementRef}
        className="feeds"
        // onClick={() => gotoFeed(post.id)}
      >
        <div className="feeds-user-info-box">
          {post.image ? (
            <img alt="" src={post.image} className="user-image" />
          ) : (
            <div className="profile-image"></div>
          )}

          <div className="feeds-user-info-box-right">
            <div>
              <div
                //   onClick={() => gotoUser(post.user_id)}
                className="user-name">
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
        <div>
          {post.gif && <img className="gif-image" src={post.gif} alt="" />}
        </div>
      </div>
    </>
  );
};
