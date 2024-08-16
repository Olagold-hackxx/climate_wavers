import { BsPerson, BsFillHouseFill, BsBookmark, BsRobot, BsPeople, BsTree } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { useState } from "react";
import { FaDonate } from "react-icons/fa";
import { getUser } from "../utils/factory";

const Menu = () => {
  const user = getUser()

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col px-6">
      {/* Menu */}
      <div className="list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear"
              : ""
          }
        >
          <BsFillHouseFill className="mr-1"  />
          Home
        </NavLink>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <BsPeople className="mr-1" />
          Community
        </NavLink>
        <NavLink
          to={`/${user.id}/disaX`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <BsRobot className="mr-1" />
          WaverX
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <BsPerson className="mr-1" />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <BsBookmark className="mr-1" />
          Bookmarks
        </NavLink>
        
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <BsTree className="mr-1" />
          Plant Trees
        </NavLink>
        <NavLink
          to={`/funds`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-linear "
              : ""
          }
        >
          <FaDonate className="mr-1" />
          Funds
        </NavLink>
      </div>
      {/* Post btn */}
      <Link
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-[#008080] text-white shadow-xl shadow-indigo-700/50 hover:from-fuchsia-600 hover:to-purple-700 p-3 rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        Post
      </Link>
      {
        isModalOpen && 
        <Modal closeFn={() => setIsModalOpen(false)}> 
          <Createpost closeModal={()=>setIsModalOpen(false)} />
        </Modal> 
      }
    </div>
  );
};

export default Menu;
