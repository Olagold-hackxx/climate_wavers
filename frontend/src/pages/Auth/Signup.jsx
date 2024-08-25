import { useState } from "react";
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
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { client } from "../../api";
import { endpoints } from "../../utils/endpoints";
import "../styles/signup-page.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, control, handleSubmit, reset } = useForm();

  const toastMsg = {
    info: "Signing Up",
    success: "Account created succesfully 👌 ",
    error: "An Error occured 🤯",
  };

  const onSubmit = async (data) => {
    try {
      await client.run(
        "post",
        endpoints?.signup,
        data,
        false,
        toastMsg,
        false,
        true
      );
      reset();
      navigate("/emailcode");
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="h-auto signup flex">
      <div className="bg-[#008080] h-[100vh] lg:w-[50%] md:w-[50%] flex justify-center banner ">
        <div className="self-center">
          <div className="writeup">
            <h2>Join Climate Wavers</h2>
            <p>
              Connect on our AI-driven social network for effective climate
              disaster responses, donate to relief efforts, and together we
              protect the world. Be part of the solution — Sign up Now!
            </p>
          </div>
          <img src="../../../logolargewhite.png" alt="" />
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] pt-8 flex justify-center  ">
        <div className="lg:w-[75%] self-center mb-12 md:w-[100%] px-12">
          <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-bold font-serif text-[#008080] text-center mb-8">
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
                color="success"
                sx={{ mr: 1, width: "50%" }}
                {...register("first_name", { required: true, maxLength: 50 })}
              />
              <TextField
                id="outlined-lasts"
                label="Last Name"
                sx={{ ml: 1, width: "50%" }}
                variant="outlined"
                color="success"
                {...register("last_name", { required: true, maxLength: 50 })}
              />
            </div>
            <TextField
              id="outlined-username"
              label="Username"
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
              {...register("username", { required: true, maxLength: 50 })}
            />
            <div className="w-[100%]">
              <Controller
                name="gender"
                control={control}
                defaultValue="Male"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-gender"
                    select
                    label="Gender"
                    sx={{ width: "100%" }}
                    color="success"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                )}
              />
            </div>
            <TextField
              id="outlined-email"
              label="Email"
              sx={{ width: "100%" }}
              variant="outlined"
              color="success"
              {...register("email", { required: true, maxLength: 50 })}
            />
            <div className="flex justify-between w-[100%]">
              <TextField
                id="outlined-country"
                label="Country"
                variant="outlined"
                sx={{ mr: 1, width: "50%" }}
                name={"country"}
                color="success"
                {...register("country", { required: true, maxLength: 50 })}
              />
              <TextField
                id="outlined-state"
                label="State"
                sx={{ ml: 1, width: "50%" }}
                variant="outlined"
                color="success"
                {...register("state", { required: true, maxLength: 50 })}
              />
            </div>
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
              name={"password"}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("password", { required: true, maxLength: 50 })}
                id="outlined-password"
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
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                {...register("password2", { required: true, maxLength: 50 })}
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
                label="Confirm Password"
              />
            </FormControl>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#008080] rounded-md text-white py-4"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-between">
              <p className="border-b border-gray-400 w-[45%]"></p>
              <p>Or</p>
              <p className="border-b border-gray-400 w-[45%]"></p>
            </div>
            <div className="flex justify-center items-center flex-col text-center">
              <div className="w-[80%] lg:w-[40%] md:w-[40%] flex mx-auto my-6 justify-between">
                <a href={`${oauthUrl}/api/v1/auth/github`}>
                  <FaGithub size={32} />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/new-google`}>
                  <FcGoogle size={32} />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/facebook`}>
                  <IoLogoFacebook color={"#1877F2"} size={32} />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/linkedin`}>
                  <BsLinkedin  color={"#0077B5"} size={32}/>
                </a>
              </div>
              <NavLink to="/">
                Already have an account?{" "}
                <span className="text-[#008080]  text-xl px-2 font-[500]">Sign In</span>{" "}
              </NavLink>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;
