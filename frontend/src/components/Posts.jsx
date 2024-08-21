import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accountcard from "./Accountcard";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import IncidentIntegration from "./IncidentIntegration";
import Createpost from "./Createpost";
import PropTypes from "prop-types";

const Posts = ({
  type,
  posts,
  postId,
  unlike,
  like,
  repost,
  unrepost,
  save,
  unsave,
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentId, setCommentId] = useState("");
  const navigate = useNavigate();

  console.log(posts);

  const commentPage = (post) => {
    if (type === "post") {
      navigate(`/${post.id}/comments`, {
        state: { post: post },
      });
    } else if (type === "comments") {
      navigate(`/${postId}/${post.id}/comments`, {
        state: { post: post },
      });
    }
  };

  return (
    <div className="py-3">
      {posts?.map((post) => (
        <div key={post?.id} className="border-b-[1px] border-gray-100 py-4">
          {isCommentModalOpen && (
            <div className="">
              <Modal closeFn={() => setIsCommentModalOpen(false)}>
                <Createpost
                  parentId={type === "comments" ? commentId : ""}
                  postId={type === "post" ? commentId : postId}
                  type="comments"
                  closeModal={() => setIsCommentModalOpen(false)}
                />
              </Modal>
            </div>
          )}
          <Accountcard user={post?.user} />
          <div onClick={() => commentPage(post)}>
            <p className="text-left text-2xl font-serif px-3 my-3 ">
              {post?.content}
            </p>
            <img
              className="w-[100%] px-3 rounded-2xl "
              src={post?.image ? post.image : ""}
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <Link onClick={() => setIsCommentModalOpen(true)}>
              <div
                className="flex flex-row items-center  px-3 mt-2 "
                onClick={() => {
                  setIsCommentModalOpen(true);
                  setCommentId(post.id);
                }}
              >
                <IoChatboxEllipsesOutline size={25} />
                <p className="text-xs ml-1 ">{post?.comment_count}</p>
              </div>
            </Link>
            <div
              className="flex flex-row items-center px-3 mt-2"
              onClick={() => {
                post?.is_reacted ? unlike.mutate(post.id) : like.mutate(post.id);
              }}
            >
              {post?.is_reacted ? (
                <AiFillHeart size={25} color={"#FF0000"} />
              ) : (
                <AiOutlineHeart size={25} />
              )}
              <p className="text-xs ml-1 ">{post?.reaction_count}</p>
            </div>
            <div
              className="flex flex-row items-center px-3 mt-2"
              onClick={() => {
                post?.is_reposted
                  ? unrepost.mutate(post.id)
                  : repost.mutate(post.id);
              }}
            >
              <AiOutlineRetweet
                size={25}
                color={post?.is_reposted ? "#047857" : ""}
              />
              <p className="text-xs ml-1 ">{post?.repost_count}</p>
            </div>

            <div
              className="flex flex-row items-center  px-3 mt-2"
              onClick={() => {
                post?.is_bookmarked
                  ? unsave.mutate(post.id)
                  : save.mutate(post.id);
              }}
            >
              {post?.is_bookmarked ? (
                <PiBookmarkFill size={25} color={"rgb(0 128 128 / 1)"} />
              ) : (
                <PiBookmark size={25} />
              )}
              <p className="text-xs ml-1 ">{post?.bookmark_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <IncidentIntegration />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  unlike: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  repost: PropTypes.object.isRequired,
  unrepost: PropTypes.object.isRequired,
  save: PropTypes.object.isRequired,
  unsave: PropTypes.object.isRequired,
};

export default Posts;
