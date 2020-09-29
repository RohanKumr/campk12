import "./css/Feeds.css";
import "emoji-mart/css/emoji-mart.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import { addPost } from "../actions/postActions";
import { Picker } from "emoji-mart";
import "react-tenor/dist/styles.css";
import Tenor from "react-tenor";
import usePostSearch from "./customHooks/usePostSearch";
import greenIcon from "./img/group-5.png";
import coinIcon from "./img/coin@3x.png";

export default function Feeds(props) {
  const [newPost, setNewPost] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [gifPicker, setGifPicker] = useState(false);
  const [gif, setGif] = useState(null);

  const [query] = useState("");
  const [pageNumber, setPageNumber] = useState(10);
  const { posts, hasMore, loading } = usePostSearch(query, pageNumber);

  const observer = useRef();

  const { userInfo } = useSelector(
    (state) => state.userLoginDetails.LoggedInUser
  );
  const dispatch = useDispatch();

  function logoutButton() {
    dispatch({ type: USER_LOGOUT });
  }

  function getPost(event) {
    setNewPost(event.target.value);
  }

  //SAVE AND SEND POST HERE
  function savePost() {
    let gifUrl = null;
    if (gif) {
      gifUrl = gif.media[0].tinygif.url;
    }
    let image = null;
    if (userInfo.image) {
      image = userInfo.image;
    }
    const user_id = userInfo._id;
    const name = userInfo.name;
    if (gifUrl || /\S/.test(newPost)) {
      dispatch(addPost(user_id, newPost, name, gifUrl, image));
    }
    setNewPost("");
    setGifPicker(false);
    setEmojiPicker(false);
    setGif(null);
  }

  function gotoFeed(feedId) {
    props.history.push("/feed/" + feedId);
  }
  // EMOJI AND GIFS
  function toggleEmojiPicker() {
    setEmojiPicker(!emojiPicker);
    setGifPicker(false);
  }

  function toggleGifPicker() {
    setGifPicker(!gifPicker);
    setEmojiPicker(false);
  }

  //ADD TO TEXT AREA
  function addGifToTextArea(selectedGif) {
    setGif(selectedGif);
  }

  function gotoUser(user_id) {
    props.history.push("/user/" + user_id);
  }

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          // console.log("Visible");
          setPageNumber((prevPageNumber) => prevPageNumber + pageNumber);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, pageNumber]
  );

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/campk12");
    }
    return () => {};
  }, [userInfo, props]);

  return (
    <div className="Feeds-container">
      <div className="Feeds-box">
        <div className="blue-background">
          <div className="feeds-item-box">
            <div className="your-feeds">Your Feed</div>
            <div className="feeds-logout" onClick={logoutButton}>
              LOGOUT
            </div>
          </div>
        </div>

        <div className="post-container">
          <div
            className="post-textarea"
            // contentEditable="true"
          >
            {gif && <img alt="" src={gif.media[0].tinygif.url} />}
            <textarea
              className="write-feed-here"
              value={newPost}
              placeholder="Write a post..."
              onClick={() => setNewPost("")}
              onChange={getPost}>
              {newPost}
            </textarea>
          </div>
          <div className="feeds-post-button" onClick={savePost}>
            POST
          </div>
          <div className="emoji-button" onClick={toggleEmojiPicker}>
            <span role="img" aria-label="happy-emoji">
              &#128515;
            </span>
          </div>
          <div className="gif-button" onClick={toggleGifPicker}>
            GIF
          </div>
          {emojiPicker ? (
            <Picker
              theme="dark"
              title="Pick your emoji…"
              emoji="smile"
              onSelect={(emoji) => setNewPost(newPost + emoji.native + " ")}
            />
          ) : null}
        </div>
        {gifPicker ? (
          <Tenor
            token="2565AC6P98OU"
            onSelect={(result) => addGifToTextArea(result)}
          />
        ) : null}
        {/* FEEDS STARTS HEREE */}
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div
                key={post.id}
                ref={lastElementRef}
                className="feeds"
                onClick={() => gotoFeed(post.id)}>
                <div className="feeds-user-info-box">
                  {post.image ? (
                    <img alt="" src={post.image} className="user-image" />
                  ) : (
                    <div className="profile-image"></div>
                  )}

                  <div className="feeds-user-info-box-right">
                    <div>
                      <div
                        onClick={() => gotoUser(post.user_id)}
                        className="user-name">
                        {post.name}
                      </div>
                      <div className="user-addon-info-box">
                        <img
                          alt=""
                          className="user-addon-icon"
                          src={greenIcon}
                        />
                        <div className="user-addon-info">100</div>
                        <div className="Oval-cont">
                          <div className="Oval"></div>
                        </div>
                        <img
                          alt=""
                          className="user-addon-icon"
                          src={coinIcon}
                        />
                        <div className="user-addon-info">340</div>
                      </div>
                    </div>
                    <div className="post-time">5h</div>
                  </div>
                </div>
                <div className="feeds-text">{post.post}</div>
                <div>
                  {post.gif && (
                    <img className="gif-image" src={post.gif} alt="" />
                  )}
                </div>
              </div>
            );
          }
          return (
            <div
              key={post.id}
              className="feeds"
              onClick={() => gotoFeed(post.id)}>
              <div className="feeds-user-info-box">
                {post.image ? (
                  <img alt="" src={post.image} className="user-image" />
                ) : (
                  <div className="profile-image"></div>
                )}
                <div className="feeds-user-info-box-right">
                  <div>
                    <div
                      onClick={() => gotoUser(post.user_id)}
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
                {post.gif && (
                  <img className="gif-image" src={post.gif} alt="" />
                )}
              </div>
            </div>
          );
        })}
        <div>{loading && "Loading..."}</div>
      </div>
    </div>
  );
}
