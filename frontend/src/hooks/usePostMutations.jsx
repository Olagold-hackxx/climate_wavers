import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { getAuthToken } from "../utils/factory";

export const usePostMutations = () => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  const queryClient = useQueryClient();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  const useCreateMutation = (url, type) => {
    return useMutation({
      mutationFn: (post) =>
        axios.post(`${url}${post}/${type}/`, {}, { headers, withCredentials: true }),
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  };

  return {
    likeMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "react"),
    unlikeMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "unreact"),
    repostMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "repost"),
    unrepostMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "unrepost"),
    saveMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "bookmark"),
    unsaveMutation: useCreateMutation(`${BACKENDURL}/api/v1/post/`, "unbookmark"),
  };
};

export default usePostMutations;
