import { useState } from "react";
import Mobilemenu from "./Mobilemenu";
import { getUser } from "../utils/factory";
import Modal from "../components/Modal";
import Report from "./Report";
import { NavLink } from "react-router-dom";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalopen] = useState(false);

  const user = getUser();

  return (
    <div className=" fixed z-50 bg-white flex  items-center justify-between md:border-b-1 border-[#000000] shadow-xl sm:shadow-md md:h-[80px] px-2 py-2  w-[100%] sm:h-[100px] ">
      {/* <img
          src={user?.profile_picture}
          className="md:hidden self-end rounded-full h-12 w-12"
          alt="Profile Pic"
          onClick={() => setIsOpen(true)}
        /> */}
        <HiOutlineMenuAlt1
        className="md:hidden"
        size={35}
        onClick={() => setIsOpen(true)}
      />
      {isOpen === true ? <Mobilemenu setIsOpen={setIsOpen} /> : null}
      <div className="flex max-sm:hidden justify-self-center md:justify-self-start px-4">
        <img src="../../Logo.png" />
      </div>
      <div className="px-8 w-[80%] justify-center  flex max-sm:hidden">
        <input
          className="bg-graylight-300 h-[60px] relative left-[6%] p-1 md:p-2 w-[83%] outline-[2px]  border border-[#dadada] focus:border-2 focus:outline-2 focus:outline-gray-500 border-graydark rounded-2xl text-graydark "
          type="text"
          placeholder="🔍 Search"
        />
      </div>
      <div className="flex max-sm:hidden justify-end  my-7 self-center">
        <button
          className="text-center  mx-4 font-semibold bg-linear  text-white shadow-xl self-center shadow-white-300 lg:w-[12vw] w-[15vw]  px-4 md:h-[50px] lg:text-xl  rounded-full"
          onClick={() => setIsModalopen(true)}
        >
          <p className="leading-5 "> Report Disaster</p>
        </button>

        <img
          src={user?.profile_picture}
          className="ml-4 self-end rounded-full h-12 w-12"
          alt="Profile Pic"
        />
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <Report closeModal={() => setIsModalopen(false)} />
        </Modal>
      )}
      <NavLink
          to={`/notifications`}
          className="flex md:hidden"
          onClick={() => setIsOpen(false)}
          end
        >
          {({ isActive }) => (
            <div className="w-[200%] flex ">
              {isActive ? (
                <IoMdNotifications
                  className=" w-12"
                  size={40}
                  color="#008080"
                />
              ) : (
                <IoMdNotificationsOutline className="w-12" size={40} />
              )}
            </div>
          )}
        </NavLink>
    </div>
  );
};

export default Topbar;
