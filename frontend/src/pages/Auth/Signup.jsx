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
import { FaApple, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    //formState
  } = useForm();

  //const formError = formState.errors;

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const onSubmit = (data) => {
    console.log(data);
    // Send data to API if needed
    const posterFn = async () => {
      await axios
        .post(`${backendUrl}/api/user/register/`, data)
        .then((response) => {
          Cookies.set("token", response.data.token);
          // Cookies.set("confirmationLink", response.data.confirmation_url);
          Cookies.set("userId", response.data.id);
        })
        .catch((error) => console.log(error));
    };
    toast.promise(posterFn, {
      pending: "Signing Up...",
      success: "Account created succesfully 👌 ",
      error: "An Error occured 🤯",
    });
    // Reset the form after submission
    reset({
      first_name: "",
      last_name: "",
      password: "",
      username: "",
      email: "",
    });
    navigate("/emailcode");
  };

  return (
    <div className="h-auto flex">
      <div className="bg-[#008080] h-[100vh] lg:w-[50%] md:w-[50%] flex justify-center ">
        <div className="self-center">
          <img src="../../../logolargewhite.png" alt="" />
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] pt-8 flex justify-center  ">
        <div className="lg:w-[75%] md:w-[100%] px-12">
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
                <FaApple className="text-[24px]" />{" "}
                <a href={`${oauthUrl}/api/v1/auth/github`}>
                  <FaGithub className="text-[24px]" />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/new-google`}>
                  <FcGoogle className="text-[24px]" />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/facebbok`}>
                  <IoLogoFacebook className="text-[24px]" />
                </a>
                <a href={`${oauthUrl}/api/v1/auth/linkedin`}>
                  <BsLinkedin className="text-[24px]" />
                </a>
              </div>
              <NavLink to="/">
                Already have an account?{" "}
                <span className="text-[#008080] font-[500]">Sign In</span>{" "}
              </NavLink>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;
