import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import bgReset from "../../assets/reset.svg";


const EmailCode = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] py-8 lg:px-16 md:px-16 px-6 m-auto text-center">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-[500]  mb-4">
          Email Verification
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] mb-10">
          Check your Email inbox for verification code
        </p>
        <FormControl sx={{ m: 1, width: "100%", my: 3 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
           Input Code
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <button className="bg-primary text-white py-4 w-[100%] m-2 mt-4">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EmailCode;
