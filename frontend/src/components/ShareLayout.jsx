import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    //bg-gradient-to-r from-slate-900 to-slate-700
    <div className=" bg-white text-[#111111] min-h-screen">
      <div className=" block ">
        <Topbar />
      </div>
      <div className="flex justify-between min-h-screen">
        <div className="w-[20%]">
        <Leftsidebar />
        </div>
        {/* <Mainfeed/> */}
        <div className="max-h-screen overflow-auto w-[60%] px-8">
          <Outlet />
        </div>
        <div className="w-[20%]">
        <Rightsidebar />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
