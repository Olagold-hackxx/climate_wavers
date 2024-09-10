import { NavLink, useLocation } from "react-router-dom";
import CampaignIcon from "@mui/icons-material/Campaign";
import { RiAlarmWarningFill } from "react-icons/ri";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useState, useEffect } from "react";

const Menu = ({ setIsOpen }) => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  const activeStyle = {
    borderLeft: "4px solid #008080",
    backgroundColor: "#264653",
    width: "103%",
    color: "white",
    fontWeight: "500",
  };

  useEffect(() => {
    // Check if any NavLink matches the current URL
    const isActive = [
      "/onboarding/home",
      "/onboarding/profile",
      "/onboarding/wallet",
      "/onboarding/bot",
      "/onboarding/disasters",
      "/onboarding/notifications",
      "/onboarding/campaigns",
      "/onboarding/community",
    ].includes(location.pathname);
    setActive(isActive);
    console.log(active);
  }, [location, active]);

  return (
    <div className="flex flex-col  px-2 w-[100%] max-sm:pl-4">
      {/* Menu */}
      <div
        className="list-none text-base lg:text-2xl  md:text-lg
        flex flex-col lg:gap-y-4 pt-10 w-auto mb-10"
      >
        <NavLink
          to={"/onboarding/home"}
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <>
              <img
                alt=""
                src={isActive ? "../../home1.png" : "../../home.svg"}
                className="mr-4 w-auto"
              />
              Home{""}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={"/onboarding/community"}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <>
              <img
                alt=""
                src={isActive ? "../../people1.png" : "../../people.png"}
                className="mr-4 w-auto"
              />
              Community{""}
            </>
          )}
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={`/onboarding/profile`}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <>
              <img
                alt=""
                src={isActive ? "../../profile1.png" : "../../profile.png"}
                className="mr-4 w-auto"
              />
              Profile{""}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={`/onboarding/bot`}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
        >
          <img src="../../waverbot.png" alt="" className="mr-4 w-auto" />
          WaverX{""}
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={`/onboarding/wallet`}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <>
              <img
                alt=""
                src={isActive ? "../../wallet1.png" : "../../wallet.png"}
                className="mr-4 w-auto"
              />
              Wallet{""}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={"/onboarding/campaigns"}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
        >
          <CampaignIcon
            sx={{ color: "#008080", fontSize: "50px" }}
            fontSize={"large"}
          />
          <p className="ml-1">Campaigns</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          to={`/onboarding/disasters`}
          style={({ isActive }) => {
            setActive(true);
            return isActive ? activeStyle : null;
          }}
        >
          <div className="w-[200%] flex">
            <RiAlarmWarningFill className="mr-2" size={35} color="#FFA500" />

            <p className="self-center pl-2"> Disasters </p>
          </div>
        </NavLink>
        <NavLink
          to={`/onboarding/notifications`}
          className={({ isActive }) => {
            return isActive || !active
              ? "flex items-center py-2 lg:px-8  max-sm:text-xl"
              : "blur-md flex items-center py-2 lg:px-8  max-sm:text-xl";
          }}
          style={({ isActive }) => {
            setActive(true);
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
      <button
        className={
          active
            ? "text-xl text-center font-semibold blur-md bg-[#008080] text-white shadow-xl self-center shadow-white-300 w-[80%] max-sm:w-[50%] py-4 rounded-3xl"
            : "text-xl text-center font-semibold bg-[#008080] text-white shadow-xl self-center shadow-white-300 w-[80%] max-sm:w-[50%] py-4 rounded-3xl"
        }
      >
        Post
      </button>
    </div>
  );
};

export default Menu;
