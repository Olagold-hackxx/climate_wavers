import Cookies from "js-cookie";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { client } from "../api";
import { endpoints } from "./endpoints";
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export const dummyUser = {
  id: 10,
  is_follower: true,
  first_name: "Admin",
  last_name: "Dev",
  username: "admin",
  email: "admin@dev",
  country: "Nigeria",
  state: "Lagos",
  profile_pic: "/img_frame_30156.png",
  password: "admin123",
  access_token: "edgyui359r8dgwhjryrrewvoiy8rjennbrrn",
};

export const dummyPost = [
  {
    id: 1,
    comment_count: 2,
    reaction_count: 6,
    view_count: 0,
    repost_count: 5,
    bookmark_count: 5,
    user: dummyUser,
    is_reacted: true,
    is_bookmarked: true,
    is_reposted: true,
    content: "Dummy post on climate wavers",
  },
  {
    id: 1,
    comment_count: 2,
    reaction_count: 4,
    view_count: 0,
    repost_count: 5,
    bookmark_count: 5,
    user: dummyUser,
    is_reacted: true,
    is_bookmarked: true,
    is_reposted: true,
    content: "First post on climate wavers",
  },
];

export const getUser = () => {
  const raw = Cookies.get("user");
  const token = Cookies.get("accessToken");

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error("Failed to parse user data from cookies:", error);
      Cookies.remove("user");
    }
  }

  if (token && !raw) {
    try {
      const fetchUser = async () => {
        const user = await client.run("get", endpoints?.user, {}, true);
        if (user) {
          const userString = JSON.stringify(user);
          Cookies.set("user", userString);
          return user;
        }
      };
      fetchUser();
    } catch (error) {
      console.error("Failed to fetch user data from API:", error);
    }
  }

  return false;
};

export const getAuthToken = () => {
  return Cookies.get("accessToken");
};

export const authRequest = (fn) => {
  try {
    return fn();
  } catch (err) {
    if (err.status == 401) {
      Cookies.delete("user");
      Cookies.delete("accessToken");
      window.location.reload();
    }
  }
};

export const getTimeAgo = (timeRef) => {
  const curr = Date.now();
  const ref = new Date(timeRef);
  return timeAgo.format(curr - ref);
};
