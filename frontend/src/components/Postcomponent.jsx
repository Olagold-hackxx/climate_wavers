import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Donate from "./Donate";
import IncidentIntegration from "./IncidentIntegration";
import { getAuthToken } from "../utils/factory";

const Postcomponent = ({ type = "post", postId = "" }) => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  let url = `${BACKENDURL}/api/v1/${type}/`;

  if (postId && type === "comments") {
    url = `${url}?post=${postId}`;
  } else if (postId && type === "subcomments") {
    url = `${BACKENDURL}/api/v1/comments/?parent=${postId}`;
  }

  const fetchPosts = async () => {
    const res = await axios.get(url, {
      headers: headers,
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data: posts,
    isLoading: postsLoading,
    error,
  } = useQuery({
    queryKey: [`${type}`],
    queryFn: fetchPosts,
  });

  const likeMutation = useMutation({
    mutationFn: (post) => {
      axios.post(`${BACKENDURL}/api/v1/post/${post}/react/`,{}, {
        headers,
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}`]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (post) =>
      axios.post(
        `${BACKENDURL}/api/v1/post/${post}/unreact/`,
        {},
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}`]);
    },
  });

  const saveMutation = useMutation({
    mutationFn: (post) =>
      axios.post(
        `${BACKENDURL}/api/v1/post/${post}/bookmark/`,{},
        { headers, withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}`]);
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: (post) =>
      axios.post(`${BACKENDURL}/api/v1/post/${post}/unbookmark/`, {}, {
        headers,
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}`]);
    },
  });

  // const handlePostClick = (selectedPost) => {
  //   navigate(`/${selectedPost.id}/comments`, {
  //     state: { postData: selectedPost, category: category },
  //   });
  // };

  const commentPage = (post) => {
    if (type === "comments") {
      navigate(`/post/${post.id}/comments`, {
        state: { post: post },
      });
    } else {
      navigate(`/${post.id}/comments`, {
        state: { post: post },
      });
    }
  };

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
  }, [postsLoading, posts, error]);

  return (
    <div className="py-3">
      {posts?.map((post) => (
        <div key={post.id} className="border-b-[1px] border-gray-700 py-4">
          {isCommentModalOpen && (
            <div className="">
              <Modal closeFn={() => setIsCommentModalOpen(false)}>
                <Createcomment
                  postId={post.id}
                  closeModal={() => setIsCommentModalOpen(false)}
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
                post.is_reacted
                  ? unlikeMutation.mutate(post.id)
                  : likeMutation.mutate(post.id);
              }}
            >
              <AiFillHeart size={18} color={post.is_reacted ? "#FF0000" : ""} />
              <p className="text-xs ml-1 ">{post.reaction_count}</p>
            </div>
            <Link onClick={() => setIsDonateModalOpen(true)}>
              <div className="flex flex-row items-center px-3 mt-2">
                <FaDonate size={18} />
                <p className="text-xs ml-1 ">{post.repost_count}</p>
              </div>
            </Link>
            <Link onClick={() => setIsCommentModalOpen(true)}>
              <div
                className="flex flex-row items-center  px-3 mt-2 "
                onClick={() => setIsCommentModalOpen(true)}
              >
                <IoChatboxEllipses size={18} />
                <p className="text-xs ml-1 ">{post.comment_count}</p>
              </div>
            </Link>
            <div
              className="flex flex-row items-center  px-3 mt-2"
              onClick={() => {
                post.is_bookmarked
                  ? unsaveMutation.mutate(post.id)
                  : saveMutation.mutate(post.id);
              }}
            >
              <PiBookmarkFill
                size={18}
                color={post.is_bookmarked ? "rgb(0 128 128 / 1)" : ""}
              />
              <p className="text-xs ml-1 ">{post.bookmark_count}</p>
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
  type: PropTypes.string,
  postId: PropTypes.string,
};

export default Postcomponent;
