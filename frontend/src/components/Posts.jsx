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
  const [updatedPosts, setUpdatedPosts] = useState(posts);
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

  const handleLike = (post) => {
    const isLiked = post.is_reacted;
    const newTotalReactions = isLiked
      ? post.total_reactions - 1
      : post.total_reactions + 1;

    // Optimistically update the post state
    setUpdatedPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id
          ? { ...p, is_reacted: !isLiked, total_reactions: newTotalReactions }
          : p
      )
    );

    // Call the appropriate mutation
    isLiked
      ? unlike.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              // Revert optimistic update on error
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_reacted: isLiked,
                        total_reactions: post.total_reactions,
                      }
                    : p
                )
              );
            },
          }
        )
      : like.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              // Revert optimistic update on error
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_reacted: isLiked,
                        total_reactions: post.total_reactions,
                      }
                    : p
                )
              );
            },
          }
        );
  };

  const handleRepost = (post) => {
    const isReposted = post.is_reposted;
    const newTotalReposts = isReposted
      ? post.total_reposts - 1
      : post.total_reposts + 1;

    setUpdatedPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id
          ? { ...p, is_reposted: !isReposted, total_reposts: newTotalReposts }
          : p
      )
    );

    isReposted
      ? unrepost.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_reposted: isReposted,
                        total_reposts: post.total_reposts,
                      }
                    : p
                )
              );
            },
          }
        )
      : repost.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_reposted: isReposted,
                        total_reposts: post.total_reposts,
                      }
                    : p
                )
              );
            },
          }
        );
  };

  const handleBookmark = (post) => {
    const isBookmarked = post.is_bookmarked;
    const newTotalBookmarks = isBookmarked
      ? post.total_bookmarks - 1
      : post.total_bookmarks + 1;

    setUpdatedPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              is_bookmarked: !isBookmarked,
              total_bookmarks: newTotalBookmarks,
            }
          : p
      )
    );

    isBookmarked
      ? unsave.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_bookmarked: isBookmarked,
                        total_bookmarks: post.total_bookmarks,
                      }
                    : p
                )
              );
            },
          }
        )
      : save.mutate(
          { postType: type, post: post.id },
          {
            onError: () => {
              setUpdatedPosts((prevPosts) =>
                prevPosts.map((p) =>
                  p.id === post.id
                    ? {
                        ...p,
                        is_bookmarked: isBookmarked,
                        total_bookmarks: post.total_bookmarks,
                      }
                    : p
                )
              );
            },
          }
        );
  };

  return (
    <div className="py-3 text-start">
      {updatedPosts?.map((post) => (
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
              onClick={() => handleLike(post)}
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
              onClick={() => handleRepost(post)}
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
              onClick={() => handleBookmark(post)}
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
