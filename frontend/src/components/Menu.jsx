import { PiBookmarkFill, PiBookmarkLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { useState } from "react";
import { getUser } from "../utils/factory";

const Menu = () => {
  const [isModalOpen, setIsModalopen] = useState(false);
  const user = getUser()
  console.log(user)

  const activeStyle = {
    borderLeft: "4px solid #008080",
    backgroundColor: "#00808014",
    maxWidth: "100%",
    fontWeight: "500",
  };

  return (
    <div className="flex flex-col px-2 w-[100%]">
      {/* Menu */}
      <div
        className="list-none text-base lg:text-2xl  md:text-lg
        flex flex-col lg:gap-y-4 pt-10 w-auto mb-10"
      >
        <NavLink
          to={"/"}
          className="flex items-center py-2 lg:px-12"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../home.png" : "../../home.svg"}
                className="mr-4 w-auto"
              />
              Home
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-12"
          to={"/community"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../people1.png" : "../../people.png"}
                className="mr-4 w-auto"
              />
              Community
            </>
          )}
        </NavLink>

        <NavLink
          className="flex items-center py-2 lg:px-12"
          to={`/${user.id}/profile`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../profile1.png" : "../../profile.png"}
                className="mr-4 w-auto"
              />
              Profile
            </>
          )}
        </NavLink>
        <NavLink
          to={`/bookmark`}
          className="flex items-center py-2 lg:px-12"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <PiBookmarkFill className="mr-2" size={40} color="#008080" />
              ) : (
                <PiBookmarkLight className="mr-2" size={40} />
              )}
              Bookmark
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-12"
          to={`/wallet`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          end
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "../../wallet1.png" : "../../wallet.png"}
                className="mr-4 w-auto"
              />
              Wallet
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-12"
          to={"/settings"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../setting.png" className="mr-4 w-auto" />
          Settings
        </NavLink>
        <NavLink
          className="flex items-center py-2 p lg:px-12"
          to={`/bot`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../Immutable.png" className="mr-4 w-auto" />
          WaverX
        </NavLink>
      </div>
      {/* Post btn */}
      <button
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-[#008080] text-white shadow-xl self-center shadow-white-300 w-[80%] py-4 rounded-3xl"
        onClick={() => setIsModalopen(true)}
      >
        Post
      </button>
      {isModalOpen && (
        <Modal  closeFn={() => setIsModalopen(false)}>
          <Createpost  closeModal={() => setIsModalopen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Menu;
