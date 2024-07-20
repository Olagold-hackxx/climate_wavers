import Accountcard from "./Accountcard";
import { AiFillHeart } from "react-icons/ai";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiBookmarkFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { FaDonate } from "react-icons/fa";

const Postcomponent = ({ category = "", type = "post", postId = "" }) => {
  const posts = [{}];
  return (
    <div className="py-3">
      {posts?.map((post, index) => (
        <div key={index} className="border-b-[1px] border-gray-700 py-4">
          {isCommentModalOpen && (
            <div className="">
              <Modal closeFn={() => setIsCommentModalOpen(false)}>
                <Createcomment
                  postId={post.id}
                  closeModal={() => setIsModalopen(false)}
                />
              </Modal>
            </div>
          )}
          {isDonateModalOpen && (
            <div className="">
              <Modal closeFn={() => setIsDonateModalOpen(false)}>
                <Donate postId={post.id} />
              </Modal>
            </div>
          )}
          <Accountcard user={post.user} />
          <div onClick={() => commentPage(post)}>
            <p className="text-left text-sm px-3 my-3 ">{post.content}</p>
            <img
              className="w-[100%] px-3 rounded-2xl "
              src={post?.image ? post.image : ""}
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <div
              className="flex flex-row items-center px-3 mt-2"
              onClick={() => {
                post.is_liked
                  ? unlikeMutation.mutate(post.id)
                  : likeMutation.mutate(post.id);
              }}
            >
              <AiFillHeart size={18} color={post.is_liked ? "#FF0000" : ""} />
              <p className="text-xs ml-1 ">{post.likers_count}</p>
            </div>
            <Link onClick={() => setIsDonateModalOpen(true)}>
              <div className="flex flex-row items-center px-3 mt-2">
                <FaDonate size={18} />
                <p className="text-xs ml-1 ">{post.comments_count}</p>
              </div>
            </Link>
            <Link onClick={() => setIsCommentModalOpen(true)}>
              <div
                className="flex flex-row items-center  px-3 mt-2 "
                onClick={() => setIsCommentModalOpen(true)}
              >
                <IoChatboxEllipses size={18} />
                <p className="text-xs ml-1 ">{post.comments_count}</p>
              </div>
            </Link>
            <div
              className="flex flex-row items-center  px-3 mt-2"
              onClick={() => {
                post.is_saved
                  ? unsaveMutation.mutate(post.id)
                  : saveMutation.mutate(post.id);
              }}
            >
              <PiBookmarkFill
                size={18}
                color={post.is_saved ? "rgb(0 128 128 / 1)" : ""}
              />
              <p className="text-xs ml-1 ">{post.savers_count}</p>
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

Postcomponent.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
  postId: PropTypes.string,
};

export default Postcomponent;
