import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import PropTypes from "prop-types";
import { getAuthToken } from "../utils/factory";

const Accountcard = ({ user }) => {
  const [isFollow, setIsFollow] = useState(false);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  // const me = getUser()

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  const follow = async (userId) => {
    await axios
      .post(
        `${backendUrl}/api/v1/follows/`,
        { following: userId },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const unfollow = async (userId) => {
    await axios
      .delete(
        `${backendUrl}/api/v1/follows/${userId}`,
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleFollow = async (userId) => {
    if (!isFollow) {
      await follow(userId);
    } else {
      await unfollow(userId);
    }
  };

  return (
    <div className="flex flex-row items-center px-3 py-1 justify-between ">
      <div className="flex flex-row items-center self-center text-black ">
        <img
          src={user?.profile_pic ? user.profile_pic : "../../pic1.png"}
          className="mr-2 rounded-full h-12"
          alt="Profile Pic"
        />{" "}
        <div className="text-lg font-bold flex flex-col">
          <h3>
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-md text-left text-gray-500">@{user?.username}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsFollow(!isFollow);
          handleFollow(user?.id);
        }}
        // style={followStyle}
        className={`bg-black text-sm text-white font-semibold py-2 px-3 ml-2  rounded-2xl ${
          isFollow &&
          "bg-stone-100 outline outline-2 outline-stone-500 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
        } `}
      >
        {isFollow === true ? "Following" : "Follow"}
      </button>
    </div>
  );
};

Accountcard.propTypes = {
  user: PropTypes.object,
};

export default Accountcard;
