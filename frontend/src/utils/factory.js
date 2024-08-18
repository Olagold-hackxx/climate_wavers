import Cookies from "js-cookie";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

export const getUser = () => {
  const raw = Cookies.get("user");
  if (raw) return JSON.parse(raw);
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
