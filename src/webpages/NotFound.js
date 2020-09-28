import React, { useEffect, useState, useRef, useCallback } from "react";
import usePostSearch from "./customHooks/usePostSearch";
// import { Link } from "react-router-dom";
// import "./css/Feeds.css";
// import { useSelector } from "react-redux";

export default function NotFound() {
  //const posts = useSelector((state) => state.postsList.posts);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(10);
  const { posts, hasMore, loading, newPost } = usePostSearch(query, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNumber((prevPageNumber) => prevPageNumber + pageNumber);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, newPost]
  );

  return (
    <div>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastElementRef}>
              <div>{post.id}</div>
              <div>{post.user_id}</div>
              <div>{post.name}</div>
              <div>{post.post}</div>
              <div className="border-bottom"></div>
            </div>
          );
        }
        return (
          <div
            className="feeds"
            // onClick={() => gotoFeed(post.id)}
          >
            <div className="feeds-user-info-box">
              <div className="profile-image"></div>
              <div className="feeds-user-info-box-right">
                <div>
                  <div
                    // onClick={() => gotoUser(post.user_id)}
                    className="user-name">
                    {post.name}
                  </div>
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
        );
      })}
      <div>{loading && "Loading..."}</div>
    </div>

    //404 PAGE!
    // <div className="Feeds-container">
    //   <div className="Feeds-box">
    //     <div className="blue-background">
    //       <div className="your-feeds">404 NOT FOUND</div>
    //       <div className="your-feeds">
    //         <Link to="/">Return</Link>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <div className="dont-have-an-acc">
    //     </div> */}
    // </div>
  );
}
