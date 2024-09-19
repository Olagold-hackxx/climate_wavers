import Postcomponent from "./Postcomponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from "../utils/factory";
import Cookies from "js-cookie";
import Createcomment from "./Createcomment";
import { getLocation } from "../utils/location";
import { useEffect } from "react";

const Mainfeed = () => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  useEffect(() => {
    getLocation();
  });


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
    const cookiesConfig = {
      domain: import.meta.env.VITE_DOMAIN,
    };
    Cookies.set("user", JSON.stringify(data), cookiesConfig);
  }

  return (
    <div className="text-2xl  pt-1 md:pt-5">
      <div className=" border-2   hidden md:flex rounded-lg shadow-3xl h-[140px] my-4 shadow-white ">
        <Createcomment type={"post"} />
      </div>
      <Postcomponent type={"post"} />
    </div>
  );
};

export default Mainfeed;
