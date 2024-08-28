import { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import { getUser } from "../utils/factory";
import Feed from "./Feed";
import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(getUser());
  const [feed, setFeeds] = useState({});

  const {
    isPending,
    error,
    isFetched,
    data: user,
  } = useProfile({
    user_id: userId,
  });

  const profileFeeds = [
    "post",
    "comments",
    "reposts",
    "bookmarks",
    "likes",
    "polls",
  ];

  useEffect(() => {
    if (isPending) {
      toast.dismiss();
      toast.info("Fetching Profile...", {
        autoClose: 200,
      });
    }
    if (isFetched) {
      setProfile(user.user);
      const feeds = {
        post: user.posts,
        comments: user.comments,
        reposts: user.repost,
        bookmarks: user.bookmarks,
        likes: user.reactions,
        polls: user.polls,
      };
      setFeeds(feeds);
    }

    if (error) {
      toast.dismiss();
      toast.error("An error fetching profile");
    }
  }, [isFetched, isPending, error, user]);

  return (
    <div className="text-2xl text-center px-2 pt-5  ">
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
              profile?.profile_pic
                ? profile?.profile_pic
                : profile?.profile_picture
            }
            className="absolute bottom-0 left-0 w-28 ml-2 mb-2 rounded-full transform translate-y-1/2"
            alt=""
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="flex flex-col mt-3 max-sm:px-2 ">
          <h2 className="text-center  md:text-2xl  font-semibold flex flex-row items-center  ">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <h2 className=" text-center text-md max-sm:text-sm font-semibold flex flex-row items-center text-gray-400 ">
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
      <Feed feeds={profileFeeds} feedData={feed} />
    </div>
  );
};

export default Profile;
