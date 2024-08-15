import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bgReset from '../../assets/password.svg'

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] py-8 lg:px-16 md:px-16 px-6 m-auto text-center">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-[500]  mb-4">
         Forgotten Password
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] mb-10">Input Email to receive reset password code</p>
         <TextField
            id="outlined-basic"
            label="Email"
            sx={{ m: 1, width: "100%" }}
            variant="outlined"
          />
        <button className="bg-primary text-white py-4 w-[100%] m-2 mt-4" onClick={() => navigate('/emailcode')}>Confirm</button>
        <div className="flex items-center justify-between my-6">
            <p className="border-b border-gray-400 w-[45%]"></p>
          <p>Or</p>
            <p className="border-b border-gray-400 w-[45%]"></p>
          </div>
      <NavLink to="/phoneverification">Use Phone instead?</NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
