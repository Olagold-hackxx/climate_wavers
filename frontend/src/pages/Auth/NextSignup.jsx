import React, { useState } from "react";
import signupBg from "../../assets/signup.svg";
import { NavLink } from "react-router-dom";
import { BsImageAlt } from "react-icons/bs";
import avatar1 from '../../assets/girl-avatar.svg'
import avatar2 from '../../assets/boy-avatar.svg'
import { useNavigate } from "react-router-dom";

const NextSignup = () => {
  const navigate = useNavigate()

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${signupBg})` }}
      ></div>
      <div className="w-[90%] lg:w-[50%] md:w-[50%] py-8 lg:px-16 md:px-16 m-auto">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-[500] text-center mb-8">
          Upload Profile Photo
        </h1>
         <div className="bg-gray-200 rounded-lg h-[30vh] mb-6 flex justify-center items-center">
            <input
              accept="image/*"
              id="upload-profile-image"
              type="file"
              hidden
            />
            <label htmlFor="upload-profile-image">
                  <BsImageAlt className="text-6xl text-gray-700" />
            </label>
            </div>

        <button className="bg-primary text-white py-4 w-[100%]" onClick={() => navigate('/verifymail')}>Confirm</button>
        <div className="flex items-center justify-between mt-4">
          <p className="border-b border-gray-400 w-[45%]"></p>
          <p>Or</p>
          <p className="border-b border-gray-400 w-[45%]"></p>
        </div>
        <div className="flex justify-center items-center flex-col text-center">
          <p>Use our Virtual avatar</p>
          <div className="w-[100%] lg:w-[50%] md:w-[50%] flex mx-auto my-6 justify-between">
           <img src={avatar2} alt="" className="w-[48%]" />
           <img src={avatar1} alt="" className="w-[48%]" />
          </div>
          <NavLink to="/">
            Already have an account?{" "}
            <span className="text-primary font-[500]">Sign In</span>{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NextSignup;
