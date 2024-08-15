import React, { useState } from "react";
import signupBg from "../../assets/signup.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import { FaApple, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import MenuItem from '@mui/material/MenuItem';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="h-auto flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${signupBg})` }}
      ></div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] p-8">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-[500] text-center mb-8">
          Sign Up
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="flex justify-between w-[100%]">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            sx={{ mr: 1, width: "50%" }}
          />
           <TextField
            id="outlined-basic"
            label="Last Name"
            sx={{ ml: 1, width: "50%" }}
            variant="outlined"
          />
          </div>
          <TextField
            id="outlined-basic"
            label="User Name"
            sx={{ m: 1, width: "100%" }}
            variant="outlined"
          />
          <div className="w-[100%]">
          <TextField
          id="outlined-select-currency"
          select
          label="Sex"
          defaultValue="Male"
          sx={{  width: "100%" }}
        >
            <MenuItem>Male</MenuItem>
            <MenuItem>Female</MenuItem>
            <MenuItem>Others</MenuItem>
            <MenuItem>Prefer not to say</MenuItem>
        </TextField>
          </div>
           <TextField
            id="outlined-basic"
            label="Email"
            sx={{ width: "100%" }}
            variant="outlined"
          />
            <div className="flex justify-between w-[100%]">
          <TextField
            id="outlined-basic"
            label="Country"
            variant="outlined"
            sx={{ mr: 1, width: "50%" }}
          />
           <TextField
            id="outlined-basic"
            label="State"
            sx={{ ml: 1, width: "50%" }}
            variant="outlined"
          />
          </div>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
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
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "confirm password"}
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
              label="Confirm Password"
            />
          </FormControl>
          <button onClick={() => navigate('/nextsignup')}  className="bg-primary text-white py-4">Sign Up</button>
          <div className="flex items-center justify-between">
            <p className="border-b border-gray-400 w-[45%]"></p>
          <p>Or</p>
            <p className="border-b border-gray-400 w-[45%]"></p>
          </div>
          <div className="flex justify-center items-center flex-col text-center">
            <div className="w-[80%] lg:w-[40%] md:w-[40%] flex mx-auto my-6 justify-between">
            <FaApple className="text-[24px]"/>
            <FaGithub className="text-[24px]" />
            <FcGoogle className="text-[24px]" />
            <IoLogoFacebook  className="text-[24px]" />
            <BsLinkedin className="text-[24px]" />
            </div>
            <NavLink to='/'>Already have an account? <span className="text-primary font-[500]">Sign In</span> </NavLink>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
