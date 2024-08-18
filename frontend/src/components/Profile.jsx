import  { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Postcomponent from "./Postcomponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAuthToken, getUser } from "../utils/factory";

const Profile = () => {
  const [category, setCategory] = useState("");
  // const user = JSON.parse(Cookies.get("user"));
  // const [profile, setprofile] = useState(user);
  const [profile, setProfile] = useState(getUser())

  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const {
    isPending,
    error,
    isFetched,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const profile = await axios.get(`${BACKENDURL}/api/v1/auth/user/`, {
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
    if(isFetched) {
      setProfile(user)
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
      <div>
        <div className="flex flex-col ml-3 mt-3 ">
          <h2 className="text-center ml-4 text-lg md:text-xl font-semibold flex flex-row items-center  ">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <h2 className=" text-center ml-4 text-sm md:text-md font-semibold flex flex-row items-center text-gray-500 ">
            @{profile?.username}
          </h2>
        </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {profile?.bio}
        </p>
        <div className="font-normal text-left white  ml-2 text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            {profile.country}
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            {profile?.profession ? profile.profession : "Climate Analyst"}
          </p>
        </div>
      </div>
      <div className=" text-lg mt-8 md:text-xl border-gray-200 h-[60px] py-4 border-2 font-semibold  ">
        <div className="text-black flex flex-row px-3 justify-between text-base gap-8 border-0 border-gray-500 ">
          <h2
            className={`cursor-pointer ${
              category === "posts" ? "border-b-[2px] border-[#008080]" : null
            } `}
            onClick={() => {
              setCategory("posts");
            }}
          >
            Posts
          </h2>
          <h2
            className={`cursor-pointer ${
              category === "comment"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("comment");
            }}
          >
            Comment
          </h2>
          <h2
            className={`cursor-pointer ${
              category === "community"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("community");
            }}
          >
            Media
            </h2>
            <h2
            className={`cursor-pointer ${
              category === "donationsy"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("donations");
            }}
          >
            Donations
          </h2>
        </div>
        <Postcomponent category={category} />
      </div>
    </div>
  );
};

export default Profile;
