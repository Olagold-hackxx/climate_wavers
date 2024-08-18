import Menu from "./Menu";
import { getUser } from "../utils/factory";

const Leftsidebar = () => {
  //made this changes just to get by to integrate the chatbot
  const user = getUser()

  return (
    <div className=" border-r-[1px] border-gray-200 hidden md:block w-[100%] h-[100vh] py-6">
      {/* Logo */}
      <div className=" flex gap-3 items-center justify-self-center md:justify-self-start">
        <div className="w-[70px]">
          <img src="../../Vector.png" />
        </div>
        <div className="flex flex-col  font-semibold text-[24px]">
          <h1>Climate Wavers</h1>
        </div>
      </div>
      <Menu />
      {/* Name box */}
      <div className="flex flex- items-center my-7 pt-8 self-center text-gray-700 px-8">
        <img
          src={user?.profile_pic ? user.profile_pic : user.default_avatar}
          className="mr-2 rounded-full h-12 w-12"
          alt="Profile Pic"
        />
        <div>
          {<h3>{user?.first_name} {user?.last_name}</h3>}
          {<p className="text-gray-700">@{user?.username}</p>}
        </div>
      </div>
    </div>
  );
};

export default Leftsidebar;
