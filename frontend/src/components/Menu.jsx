import {
  BsPerson,
  BsFillHouseFill,
  BsBookmark,
  BsRobot,
  BsPeople,
} from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { useState } from "react";
import { FaDonate } from "react-icons/fa";
import { getUser } from "../utils/factory";
import { BsTree } from "react-icons/bs";

const Menu = () => {
  const user = getUser();
  const [isModalOpen, setIsModalopen] = useState(false);

  const activeStyle = {
    borderLeft: "3px solid #008000",
    backgroundColor: "#00800030",
    width: "100%",
    padding: "10px 30px",
  };


  return (
    <div className="flex flex-col px-12 w-[100%]">
      {/* Menu */}
      <div className="list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min">
        <NavLink
          to={"/"}
          className='flex items-center py-2 px-8'
          style={({ isActive }) => (isActive ? activeStyle : null)}
          end
        >
          <BsFillHouseFill className="mr-2" />
          Home
        </NavLink>
        <NavLink
          className='flex items-center py-2 px-8'
          to={"/community"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <BsPeople className="mr-2" />
          Community
        </NavLink>
        <NavLink
          className='flex items-center py-2 px-8'
          to={`/${user.id}/disaX`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <BsRobot className="mr-2" />
          WaverX
        </NavLink>
        <NavLink
          className='flex items-center py-2 px-8'
          to={"/profile"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <BsPerson className="mr-2" />
          Profile
        </NavLink>
        <NavLink 
          to={`/bookmark`}
          className='flex items-center py-2 px-8'
        style={({ isActive }) => (isActive ? activeStyle : null)}>
          <BsBookmark className="mr-2" />
          Bookmarks
        </NavLink>

        <NavLink 
          className='flex items-center py-2 px-8'
          to={`/planttree`}
        style={({ isActive }) => (isActive ? activeStyle : null)}>
          <BsTree className="mr-2" />
          Plant Trees
        </NavLink>
        <NavLink
          className='flex items-center py-2 px-8'
          to={`/funds`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <FaDonate className="mr-2" />
          Funds
        </NavLink>
      </div>
      {/* Post btn */}
      <Link
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-[#008080] text-white shadow-xl shadow-indigo-700/50 hover:from-fuchsia-600 hover:to-purple-700 p-3 rounded-full"
        onClick={() => setIsModalopen(true)}
      >
        Post
      </Link>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <Createpost closeModal={() => setIsModalopen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Menu;
