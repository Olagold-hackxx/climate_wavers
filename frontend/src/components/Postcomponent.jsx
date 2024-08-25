import { useEffect } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import { toast } from "react-toastify";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { usePostMutations } from "../hooks/usePostMutations";

const Postcomponent = ({ type, postId, comment }) => {
  const {
    data: posts,
    isLoading: postsLoading,
    error,
  } = useFetchPosts({
    type,
    postId,
    comment,
  });

  const {
    likeMutation,
    unlikeMutation,
    repostMutation,
    unrepostMutation,
    saveMutation,
    unsaveMutation,
  } = usePostMutations();
  // const handlePostClick = (selectedPost) => {
  //   navigate(`/${selectedPost.id}/comments`, {
  //     state: { postData: selectedPost, category: category },
  //   });
  // };

  useEffect(() => {
    if (postsLoading) {
      toast.dismiss();
      toast.info("Fetching Posts...", {
        autoClose: 200,
      });
    }

    if (error) {
      toast.dismiss();
      toast.error("An error occurred while fetching posts");
    }
  }, [postsLoading, posts, error]);

  return (
    <div>
      <Posts
        posts={posts}
        type={type}
        postId={postId}
        unlike={unlikeMutation}
        like={likeMutation}
        repost={repostMutation}
        unrepost={unrepostMutation}
        save={saveMutation}
        unsave={unsaveMutation}
      />
    </div>
  );
};

Postcomponent.propTypes = {
  type: PropTypes.string,
  comment: PropTypes.string,
  postId: PropTypes.string,
};

export default Postcomponent;
