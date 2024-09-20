import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Accountcard from "./Accountcard";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
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
    <div className="py-3 text-start">
      {posts?.map((post) => (
        <div
          key={`${post?.user?.id}${post?.id}`}
          className="border-b-[1px] border-gray-100 py-4"
        >
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
          <button onClick={() => commentPage(post)} className="w-full">
            <p className="text-left md:text-2xl max-sm:text-[20px] font-serif px-3 my-3 ">
              {post?.content}
            </p>
            <img
              className="w-[100%] px-3 rounded-2xl "
              src={post?.image ? post.image : ""}
              alt=""
            />
          </button>
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <Link onClick={() => setIsCommentModalOpen(true)}>
              <button
                className="flex flex-row items-center  px-3 mt-2 "
                onClick={() => {
                  setIsCommentModalOpen(true);
                  setCommentId(post.id);
                }}
              >
                <IoChatboxEllipsesOutline size={25} />
                <p className="text-xs ml-1 ">{post?.total_comments}</p>
              </button>
            </Link>
            <div
              className="flex flex-row items-center px-3 mt-2"
              onClick={() => {
                post?.is_reacted
                  ? unlike.mutate({ postType: type, post: post.id })
                  : like.mutate({ postType: type, post: post.id });
              }}
            >
              {post?.is_reacted ? (
                <AiFillHeart
                  size={25}
                  color={"#FF0000"}
                  className="transition active:animate-ping   ease-in-out duration-150 hover:scale-125"
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  className="transition active:animate-ping ease-in-out duration-150 hover:scale-125 "
                />
              )}
              <p className="text-xs ml-1 ">{post?.total_reactions}</p>
            </div>
            <button
              className="flex flex-row items-center px-3 mt-2"
              onClick={() => {
                post?.is_reposted
                  ? unrepost.mutate({ postType: type, post: post.id })
                  : repost.mutate({ postType: type, post: post.id });
              }}
            >
              <AiOutlineRetweet
                size={25}
                className="transition active:animate-ping ease-in-out duration-150 hover:scale-125 "
                color={post?.is_reposted ? "#047857" : ""}
              />
              <p className="text-xs ml-1 ">{post?.total_reposts}</p>
            </button>

            <button
              className="flex flex-row items-center  px-3 mt-2"
              onClick={() => {
                post?.is_bookmarked
                  ? unsave.mutate({ postType: type, post: post.id })
                  : save.mutate({ postType: type, post: post.id });
              }}
            >
              {post?.is_bookmarked ? (
                <PiBookmarkFill
                  size={25}
                  color={"rgb(0 128 128 / 1)"}
                  className="transition ease-in-out active:animate-ping duration-150 hover:scale-125 "
                />
              ) : (
                <PiBookmark
                  size={25}
                  className="transition ease-in-out active:animate-ping duration-150 hover:scale-125 "
                />
              )}
              <p className="text-xs ml-1 ">{post?.total_bookmarks}</p>
            </button>
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
  postId: PropTypes.string,
  unlike: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  repost: PropTypes.object.isRequired,
  unrepost: PropTypes.object.isRequired,
  save: PropTypes.object.isRequired,
  unsave: PropTypes.object.isRequired,
};

export default Posts;
