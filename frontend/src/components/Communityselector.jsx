import { NavLink } from "react-router-dom";

const Communityselector = () => {
  return (
    < div className="px-2">
    <div className="border-2 h-[60px] text-center py-2 font-bold text-2xl shadow-xl">
      Trending
    </div>
    <div className="flex flex-col gap-2 bg-white bg-opacity-10 border-2 text-[#111111] text-xl list-none w-[100%] h-[50%] py-4">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-gray-400 bg-opacity-25 "
            : "hover:bg-graydark p-2"
        }
        to={"/"}
      >
       WaverX
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-gray-400 bg-opacity-25  "
            : "hover:bg-graydark p-2"
        }
        to={"/community"}
      >
        Nature
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-gray-400 bg-opacity-25   "
            : "hover:bg-graydark p-2"
        }
        to={"/community"}
      >
        Climate Action
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-gray-400 bg-opacity-25   "
            : "hover:bg-graydark p-2"
        }
        to={"/communtiy"}
      >
        Wildlife
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hover:bg-graydark p-2 bg-gray-400 bg-opacity-25  "
            : "hover:bg-graydark p-2"
        }
        to={"/community"}
      >
       Reforestation
      </NavLink>
    </div>
    </div>
  );
};

export default Communityselector;