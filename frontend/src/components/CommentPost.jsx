import { useState, useEffect } from "react";
import Accountcard from "./Accountcard";
import { AiFillHeart } from "react-icons/ai";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiBookmarkFill } from "react-icons/pi";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaDonate } from "react-icons/fa";
import Modal from "./Modal";
import Createcomment from "./Createcomment";
import IncidentIntegration from "./IncidentIntegration";
import { getAuthToken } from "../utils/factory";

const CommentPost = ({ type="post", postId = "" }) => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  const [isModalOpen, setIsModalopen] = useState(false);

  const queryClient = useQueryClient();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  let url;
  if (postId && type === "comments") {
    url = `${BACKENDURL}/api/v1/post/${postId}`;
  } else if (postId && type === "subcomments") {
    url = `${BACKENDURL}/api/v1/comments/${postId}`;
  }
  const fetchPosts = async () => {
    const res = await axios.get(url, {
      headers: headers,
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data: post,
    isLoading: postsLoading,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPosts,
  });

  const likeMutation = useMutation({
    mutationFn: (postId) =>
      axios.put(
        `${BACKENDURL}/api/v1/like_savepost/${postId}/`,
        { action: "like" },
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (postId) =>
      axios.put(
        `${BACKENDURL}/api/v1/like_savepost/${postId}/`,
        { action: "like", like: false },
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const saveMutation = useMutation({
    mutationFn: (postId) =>
      axios.put(
        `${BACKENDURL}/api/v1/like_savepost/${postId}/`,
        { action: "save" },
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (postId) =>
      axios.put(
        `${BACKENDURL}/api/v1/like_savepost/${postId}/`,
        { action: "save", save: false },
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  useEffect(() => {
    if (postsLoading) {
      toast.dismiss();
      toast.info("Fetching Posts...", {
        autoClose: 500,
      });
    }

    if (error) {
      toast.dismiss();
      toast.error("An error occurred while fetching posts");
    }
  }, [postsLoading, post, error]);

  return (
    <div className="py-3">
      <div className="border-b-[1px] border-gray-700 py-4">
        <Accountcard user={post?.user} />
        <div>
          <p className="text-left text-sm px-3 my-3 ">{post?.content}</p>
          <img
            className="w-[80%] px-3 rounded-3xl "
            src={post?.image ? post.image : ""}
            alt=""
          />
        </div>
        <div className="flex flex-row justify-between px-3 mt-2 ">
          <div
            className="flex flex-row items-center px-3 mt-2"
            onClick={() => {
              post.is_liked
                ? unlikeMutation.mutate(post?.id)
                : likeMutation.mutate(post?.id);
            }}
          >
            <AiFillHeart size={18} color={post?.is_liked ? "#e01616" : ""} />
            <p className="text-xs ml-1 ">{post?.likers_count}</p>
          </div>
          <div className="flex flex-row items-center px-3 mt-2">
            <FaDonate size={18} />
            <p className="text-xs ml-1 ">{post?.comments_count}</p>
          </div>
          <Link onClick={() => setIsModalopen(true)}>
            <div
              className="flex flex-row items-center px-3 mt-2 "
              onClick={() => setIsModalopen(true)}
            >
              <IoChatboxEllipses size={18} />
              <p className="text-xs ml-1 ">{post?.comments_count}</p>
            </div>
          </Link>
          <div
            className="flex flex-row items-center px-3 mt-2"
            onClick={() => {
              post.is_saved
                ? unsaveMutation.mutate(post?.id)
                : saveMutation.mutate(post?.id);
            }}
          >
            <PiBookmarkFill
              size={18}
              color={post?.is_saved ? "rgb(0 128 128 / 1)" : ""}
            />
            <p className="text-xs ml-1 ">{post?.savers_count}</p>
          </div>
          <div className="flex flex-row items-center  ">
            <IncidentIntegration />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <Createcomment postId={postId} parentId={post.id}  closeModal={() => setIsModalopen(false)} />
        </Modal>
      )}

    </div>
  );
};

CommentPost.propTypes = {
  postId: PropTypes.number,
  type: PropTypes.string,
};

export default CommentPost;
