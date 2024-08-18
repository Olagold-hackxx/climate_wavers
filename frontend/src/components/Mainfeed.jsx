import Postcomponent from "./Postcomponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuthToken } from "../utils/factory";
import Cookies from "js-cookie";

const Mainfeed = () => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();

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
      {/* <h2 className='text-left p-2 border-gray-500  font-semibold '>Home</h2> */}
      <div className="pb-1 md:pb-3 text-lg md:text-xl border-b-2 border-gray-600 font-semibold">
        Home
      </div>
      <Postcomponent />
    </div>
  );
};

export default Mainfeed;
