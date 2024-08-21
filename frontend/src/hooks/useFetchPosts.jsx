import { useQuery } from "@tanstack/react-query";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";

const useFetchPosts = ({ type, postId, comment }) => {
 
  let url;
  if (postId && type === "comments") {
    url = `${endpoints.comments}?post=${postId}`;
  } else if (comment && type === "comments") {
    url = `${endpoints.comments}?parent=${comment}`;
  } else if (type === "post") {
    url = `${endpoints.post}`;
  }

  const fetchPosts = async () => {
    const res = await client.run("get", url, {}, true);
    return res;
  };

  return useQuery({
    queryKey: ["posts", postId, comment],
    queryFn: fetchPosts,
  });
};

export default useFetchPosts;
