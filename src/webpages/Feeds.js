import "./css/Feeds.css";
import "emoji-mart/css/emoji-mart.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../constants/userLoginConstants";
import { addPost } from "../actions/postActions";
import { Picker } from "emoji-mart";
//GIPHY
// import GiphySelect from "react-giphy-select";
// import "react-giphy-select/lib/styles.css";

//TENOR
import "react-tenor/dist/styles.css";
import Tenor from "react-tenor";

export default function Feeds(props) {
  const [newPost, setNewPost] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [gifPicker, setGifPicker] = useState(false);
  const [gif, setGif] = useState(null);
  const users = useSelector((state) => state.userList.users);
  const posts = useSelector((state) => state.postsList.posts);
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
    const user_id = userInfo._id;
    const name = userInfo.name;
    let gifUrl = null;
    if (gif) {
      gifUrl = gif.media[0].tinygif.url;
      console.log(gifUrl);
    }
    dispatch(addPost(newPost, user_id, name, gifUrl));
    setNewPost("Write another post..");
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
    if (newPost === "Write a post...") {
      setNewPost("");
    }
    if (newPost === "Write another post..") {
      setNewPost("");
    }
  }
  useEffect(() => {
    if (!userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo, addGifToTextArea]);

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
            {gif && <img src={gif.media[0].tinygif.url} alt="Selected GIF" />}
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
            &#128515;
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
          {gifPicker ? (
            <Tenor
              token="2565AC6P98OU"
              onSelect={(result) => addGifToTextArea(result)}
            />
          ) : null}
        </div>

        {/* FEEDS STARTS HEREE */}
        {posts.map((post) => (
          <div className="feeds" onClick={() => gotoFeed(post.id)}>
            <div className="feeds-user-info-box">
              <div className="profile-image"></div>
              <div className="feeds-user-info-box-right">
                <div>
                  <div className="user-name">{post.name}</div>
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
            <div>
              {post.gif && (
                <img className="gif-image" src={post.gif} alt="Selected GIF" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
