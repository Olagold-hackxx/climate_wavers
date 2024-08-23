import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    //bg-gradient-to-r from-slate-900 to-slate-700
    <div className=" bg-white text-[#111111] min-h-screen">
      <div className="pb-20 block ">
        <Topbar />
      </div>
      <div className="flex  justify-between min-h-screen">
        <div className="w-[20%] max-sm:hidden ">
        <Leftsidebar />
        </div>
        {/* <Mainfeed/> */}
        <div className="w-full h-full overflow-y-auto md:w-[60%] md:px-8 px-2 items-center">
          <Outlet />
        </div>
        <div className="w-[20%] max-sm:hidden">
        <Rightsidebar />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
