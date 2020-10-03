import React from "react";
import { Picker } from "emoji-mart";

export const WritePost = (props) => {
  const {
    gif,
    newPost,
    onGetPostChange,
    onSavePostClick,
    onToggleEmojiPickerClick,
    onToggleGifPicker,
    emojiPicker,
    setNewPost,
  } = props;
  return (
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
          onChange={onGetPostChange}>
          {newPost}
        </textarea>
      </div>
      <div className="feeds-post-button" onClick={onSavePostClick}>
        POST
      </div>
      <div className="emoji-button" onClick={onToggleEmojiPickerClick}>
        <span role="img" aria-label="happy-emoji">
          &#128515;
        </span>
      </div>
      <div className="gif-button" onClick={onToggleGifPicker}>
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
  );
};
