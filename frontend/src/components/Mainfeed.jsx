import Postcomponent from "./Postcomponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from "../utils/factory";
import Cookies from "js-cookie";
import Createcomment from "./Createcomment";
import FeedHeader from "./FeedHeader";
import { getLocation } from "../utils/location";
import { useEffect } from "react";

const Mainfeed = () => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  useEffect(() => {
    getLocation();
  });

  const homeFeeds = [
    "Feeds",
    "Reports",
    "Trending",
    "Climate Action",
    "Alerts",
  ];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };
  const endpoint = `${BACKENDURL}/api/v1/auth/user/`;
  const fetchUserDetailsFn = async () => {
    const res = await axios.get(endpoint, {
      headers: headers,
      withCredentials: true,
    });
    return res.data;
  };

  const { data, isFetched } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetailsFn,
  });
  if (isFetched) {
    Cookies.set("user", JSON.stringify(data));
  }

  return (
    <div className="text-2xl text-center pt-1 md:pt-5">
      <div className=" text-lg md:text-xl max-sm:hidden border-gray-200  max-sm:hidden rounded-md h-[50px] pb-2 border-2 font-bold  ">
        <FeedHeader feeds={homeFeeds} />
      </div>
      <div className=" border-2   max-sm:hidden rounded-lg shadow-3xl h-[140px] my-4 shadow-white ">
        <Createcomment type={"post"} />
      </div>
      <Postcomponent type={"post"} />
    </div>
  );
};

export default Mainfeed;
