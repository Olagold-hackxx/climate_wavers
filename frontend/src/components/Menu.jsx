import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import Createpost from "./Createpost";
import { getUser } from "../utils/factory";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useState } from "react";
import { RiAlarmWarningFill } from "react-icons/ri";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";

const Menu = ({ setIsOpen }) => {
  const [isModalOpen, setIsModalopen] = useState(false);
  const user = getUser();

  const activeStyle = {
    borderLeft: "4px solid #008080",
    backgroundColor: "#00808014",
    maxWidth: "100%",
    fontWeight: "500",
  };

  return (
    <div className="flex flex-col px-2 w-[100%] max-sm:pl-4">
      {/* Menu */}
      <div
        className="list-none text-base lg:text-2xl  md:text-lg
        flex flex-col lg:gap-y-4 pt-10 w-auto mb-10"
      >
        <NavLink
          to={"/"}
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
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
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={"/community"}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
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
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/${user.id}/profile`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
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
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/bot`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../waverbot.png" className="mr-4 w-auto" />
          WaverX
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/wallet`}
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
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
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={"/campaigns"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <CampaignIcon
            sx={{ color: "#008080", fontSize: "50px" }}
            fontSize={"large"}
          />
          <p className="ml-1">Campaigns</p>
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/disasters`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <div className="w-[200%] flex">
            <RiAlarmWarningFill className="mr-2" size={35} color="#FFA500" />

            <p className="self-center pl-2"> Disasters </p>
          </div>
        </NavLink>
        <NavLink
          to={`/notifications`}
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <div className="w-[200%] flex max-sm:">
              {isActive ? (
                <IoMdNotifications className="mr-2" size={40} color="#008080" />
              ) : (
                <IoMdNotificationsOutline className="mr-2" size={40} />
              )}
              <p className="self-center"> Notifications</p>
            </div>
          )}
        </NavLink>
      </div>
      {/* Post btn */}
      <button
        // to={"./createpost"}
        className="text-xl text-center font-semibold bg-[#008080] text-white shadow-xl self-center shadow-white-300 w-[80%] max-sm:w-[50%] py-4 rounded-3xl"
        onClick={() => setIsModalopen(true)}
      >
        Post
      </button>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <Createpost
            type={"post"}
            closeModal={() => {
              setIsModalopen(false);
              setIsOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Menu;
