import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bgReset from '../../assets/password.svg'
import { useNavigate } from "react-router-dom";

const PasswordVerify = () => {
    const navigate = useNavigate();

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] py-8 px-16 m-auto text-center">
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
        <button className="bg-primary text-white py-4 w-[100%] m-2 mt-4">Confirm</button>
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

export default PasswordVerify;
