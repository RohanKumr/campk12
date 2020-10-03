import "./Feeds.css";
import "emoji-mart/css/emoji-mart.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../constants/userLoginConstants";
import { addPost } from "../../actions/postActions";
import { Picker } from "emoji-mart";
import "react-tenor/dist/styles.css";
import Tenor from "react-tenor";
import usePostSearch from "../../customHooks/usePostSearch";
// import greenIcon from "../../img/group-5@3x.png";
// import coinIcon from "../../img/coin@3x.png";
import { Header } from "../../components/Header";
import { Feed } from "../../components/Feed";

export default function Feeds(props) {
  const [newPost, setNewPost] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [gifPicker, setGifPicker] = useState(false);
  const [gif, setGif] = useState(null);

  const [pageNumber, setPageNumber] = useState(10);
  const { posts, loading } = usePostSearch(pageNumber);

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

  // function gotoUser(user_id) {
  //   props.history.push("/user/" + user_id);
  // }

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        //node we are observing
        if (enteries[0].isIntersecting) {
          // console.log("Visible");
          setPageNumber((prevPageNumber) => prevPageNumber + 5);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
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
        <Header
          backButton={false}
          text="Your Feed"
          onClick={() => logoutButton()}
        />

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
              <Feed
                setRef={true}
                key={post.id}
                forwardRef={lastElementRef}
                onClick={() => gotoFeed(post.id)}
                post={post}
              />
            );
          }
          return (
            <Feed key={post.id} onClick={() => gotoFeed(post.id)} post={post} />
          );
        })}
        <div>{loading && "Loading..."}</div>
      </div>
    </div>
  );
}
