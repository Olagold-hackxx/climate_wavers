import { NavLink } from "react-router-dom";
import { getUser } from "../utils/factory";
import CampaignIcon from "@mui/icons-material/Campaign";
import { RiAlarmWarningFill } from "react-icons/ri";
// import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";

const Footer = ({ setIsOpen }) => {
  const user = getUser();

  const activeStyle = {

  };

  return (
    <div className="flex w-full">
      {/* Menu */}
      <div
        className="list-none w-[100%] px-2 fixed z-30 bg-white bottom-0 text-base
        flex justify-between"
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
                className=" w-[30px]"
              />
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
                className="  w-[30px]"
              />
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
                className="  w-[30px]"
              />
            </>
          )}
        </NavLink>
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={`/bot`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <img src="../../waverbot.png" className=" w-auto w-[2rem]" />
        </NavLink>
        {/* <NavLink
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
                className=" w-auto w-[30px]"
              />
              Wallet
            </>
          )}
        </NavLink> */}
        <NavLink
          className="flex items-center py-2  lg:px-8  max-sm:text-xl"
          to={"/campaigns"}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <CampaignIcon
            sx={{ color: "#008080", fontSize: "40px" }}
            fontSize={"small"}
          />
        </NavLink>
        <NavLink
          className="flex items-center py-2 lg:px-8  max-sm:text-xl"
          to={`/disasters`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <div className="w-[200%] flex">
            <RiAlarmWarningFill className="w-[30px]" size={35} color="#EA4335" />

          </div>
        </NavLink>
        {/* <NavLink
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
                <IoMdNotifications
                  className=" w-[30px]"
                  size={40}
                  color="#008080"
                />
              ) : (
                <IoMdNotificationsOutline className="w-[30px]" size={40} />
              )}
            </div>
          )}
        </NavLink> */}
      </div>
    </div>
  );
};

export default Footer;
