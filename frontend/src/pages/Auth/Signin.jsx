import { useState } from "react";
import signinBg from "../../assets/signin.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink } from "react-router-dom";
import { FaApple, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] md:flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${signinBg})` }}
      ></div>
      <div className="w-[100%] lg:w-[30%] md:w-[50%] p-8 m-auto max-sm:pt-[200px]">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#008080] font-bold font-serif text-center mb-8">
          Sign In
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="mercia@gmail.com"
            color="success"
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            color="success"
          >
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
          <NavLink to="/forgotpassword" className="text-gray-400 text-[14px]">
            Forgot Password?
          </NavLink>
          <button className="bg-[#008080] text-white py-4 rounded-md font-serif">
            Sign In
          </button>
          <div className="flex items-center justify-between">
            <p className="border-b border-gray-400 w-[45%]"></p>
            <p>Or</p>
            <p className="border-b border-gray-400 w-[45%]"></p>
          </div>
          <div className="flex justify-center items-center flex-col text-center">
            <div className="w-[80%] lg:w-[40%] md:w-[40%] flex mx-auto my-6 justify-between">
              <FaApple className="text-[24px]" />
              <FaGithub className="text-[24px]" />
              <FcGoogle className="text-[24px]" />
              <IoLogoFacebook className="text-[24px]" />
              <BsLinkedin className="text-[24px]" />
            </div>
            <NavLink to="/signup">
              Don't have an account?{" "}
              <span className="text-primary font-[500] text-[#008080]">Sign Up</span>{" "}
            </NavLink>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Signin;
