import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function usePostSearch(pageNumber) {
  const allPosts = useSelector((state) => state.postsList.posts);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([]);
    return () => {};
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    // setError(false);
    setPosts(allPosts.filter((p, i) => i < pageNumber));
    // setHasMore(allPosts.length > 0);
    setLoading(false);
    return () => {};
  }, [pageNumber, allPosts]);
  return { loading, posts };
}
