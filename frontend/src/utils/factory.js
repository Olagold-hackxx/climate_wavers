import Cookies from "js-cookie";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { client } from "../api";
import { endpoints } from "./endpoints";
import axios from 'axios';

TimeAgo.addDefaultLocale(en);
import { dummyUser, dummyCampaigns } from "./dummies";
import { ipinfoKey, ipinfoUrl } from "../config/ipinfo.config";

const timeAgo = new TimeAgo("en-US");

export const getCampaigns = () => {
  return dummyCampaigns;
};

export const getUser = () => {
  const backendStatus = import.meta.env.VITE_APP_BACKEND_STATUS === "true";
  if (!backendStatus) {
    return dummyUser;
  }
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
  const token = Cookies.get("accessToken");
  return token;
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

export const stripLastS = (string) => {
  return string.endsWith("s") ? string.slice(0, -1) : string;
};


export const getLocation  = async function(){
  const ip = await getIPFromAmazon()
  if(!ipinfoKey && ipinfoUrl)return
  try{
      const response = await axios.get(`${ipinfoUrl}/${ip}/?token=${ipinfoKey}`)
          return response.data 
  }catch(err){
      return undefined
  }
}

function getIPFromAmazon() {
  return fetch("https://checkip.amazonaws.com/").then(res => res.text()).then(ip=>ip.trim())
}
