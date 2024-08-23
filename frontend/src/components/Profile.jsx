import { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Postcomponent from "./Postcomponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAuthToken, getUser } from "../utils/factory";
import FeedHeader from "./FeedHeader";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(getUser());

  const profileFeeds = [
    "Posts",
    "Comments",
    "Donation",
    "Reports",
    "Media",
    "Groups",
  ];

  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const endpoint = `/api/v1/users/${userId}/`;
 
  const {
    isPending,
    error,
    isFetched,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const profile = await axios.get(`${BACKENDURL}${endpoint}`, {
        headers: headers,
        withCredentials: true,
      });
      return profile.data;
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.dismiss();
      toast.info("Fetching Profile...", {
        autoClose: 200,
      });
    }
    if (isFetched) {
      setProfile(user);
    }

    if (error) {
      toast.dismiss();
      toast.error("An error fetching profile");
    }
  }, [isFetched, isPending, error, user]);

  return (
    <div className="text-2xl text-center pt-1 px-2 md:pt-5  ">
      <div className="h-[35vh]">
        <div
          className={`h-[30vh] w-[100%] relative bg-cover bg-center rounded-[20px]`}
          style={{
            backgroundImage: `url(${
              profile?.cover ? `${profile.cover}` : "../../environ.jpeg"
            })`,
          }}
        >
          <img
            src={
              profile?.profile_pic ? `${profile.profile_pic}` : "../../pic1.png"
            }
            className="absolute bottom-0 left-0 w-28 ml-2 mb-2 transform translate-y-1/2"
            alt=""
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="flex flex-col mt-3 ">
          <h2 className="text-center  text-2xl font-semibold flex flex-row items-center  ">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <h2 className=" text-center text-md font-semibold flex flex-row items-center text-gray-400 ">
            @{profile?.username}
          </h2>
        </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {profile?.bio}
        </p>
        <div className="font-normal text-left text-xl white text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            {profile?.country}
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            {profile?.profession ? profile.profession : "Climate Analyst"}
          </p>
        </div>
      </div>
      <FeedHeader feeds={profileFeeds} />
      <Postcomponent type={"post"} />
    </div>
  );
};

export default Profile;
