import Postcomponent from "./Postcomponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from "../utils/factory";
import Cookies from "js-cookie";
import Createcomment from "./Createcomment";
import { useState } from "react";

const Mainfeed = () => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  const [category, setCategory] = useState("");

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
  console.log(data);

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <div className=" text-lg md:text-xl border-gray-200 rounded-md h-[50px] pb-2 border-2 font-bold  ">
      <div className="text-black font-bold text-xl grid grid-cols-4 px-2 justify-between content-end h-[100%] text-base gap-8 ">
      <div
            className={`cursor-pointer ${
              category === "reports" ? "border-b-[2px] border-[#008080]" : null
            } `}
            onClick={() => {
              setCategory("reports");
            }}
          >
            Reports
          </div>
          <div
            className={`cursor-pointer ${
              category === "education"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("education");
            }}
          >
            Feeds
          </div>
          <div
            className={`cursor-pointer ${
              category === "community"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("community");
            }}
          >
            Community
          </div>
          <div
            className={`cursor-pointer ${
              category === "trending"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("trending");
            }}
          >
           Trending
          </div>
        </div>
        </div>
      <div className=" border-2  rounded-lg shadow-3xl h-[150px] my-4 shadow-white ">
        < Createcomment />
</div>
      <Postcomponent />
    </div>
  );
};

export default Mainfeed;
