import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Mobilemenu from "./Mobilemenu";
import { getUser } from "../utils/factory";
import CreateReport from "../components/CreateReport";
import Modal from "../components/Modal";


const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalopen] = useState(false);

  const user = getUser()
  



  return (
    <div className=" grid grid-cols-[1fr_2fr_1frz] md:flex  items-center justify-between border-b-1 border-[#000000] shadow-xl md:h-[80px] px-2 py-2 md:px-10 md:py-4 w-[100%] ">
      <HiOutlineMenuAlt1 className="md:hidden" size={35} onClick={() => setIsOpen(true)} />
      {isOpen === true ? <Mobilemenu setIsOpen={setIsOpen} /> : null}
      <div className=" justify-self-center md:justify-self-start ">
        <img src="../../Logo.png" />
      </div>
      <div className='md:pl-6 w-[65%] '>
            <input className='bg-graylight-300 h-[60px]  p-1 md:p-2 w-[93%] outline-[2px]  border border-[#dadada] focus:border-2 focus:outline-2 focus:outline-gray-500 border-graydark rounded-2xl text-graydark ' type="text" placeholder='🔍 Search' />
        </div>
      <div className="flex flex- items-center my-7 p-8 self-center text-gray-700 px-8">
      <button
        className="text-xl text-center mx-4 font-semibold bg-linear h-[100%] text-white shadow-xl self-center shadow-white-300 w-[100%] px-4 py-3 rounded-full"
        onClick={() => setIsModalopen(true)}
      >
        Report Disaster 
      </button>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <CreateReport closeModal={() => setIsModalopen(false)} />
        </Modal>
      )}
        <img
          src={user?.profile_pic ? user.profile_pic : "../../pic1.png"}
          className="mr-2 rounded-full h-12 w-12"
          alt="Profile Pic"
        />
        
      </div>
    </div>

  );
};

export default Topbar;
