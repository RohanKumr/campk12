import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function usePostSearch(query, pageNumber) {
  const allPosts = useSelector((state) => state.postsList.posts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
    return () => {};
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPosts(allPosts.filter((p, i) => i < pageNumber));
    // setPosts((prevPosts) => {
    //   return [...prevPosts, allPosts.map((p, i) => p)];
    // });

    setHasMore(allPosts.length > 0);
    setLoading(false);
    return () => {};
  }, [query, pageNumber, allPosts]);
  return { loading, error, posts, hasMore };
}
