import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

//const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
//const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

const Loginpage = () => {
  const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

  return (
    <div className="text-white grid md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center ">
      <div className="bg-[#047857] grid h-[80vh] md:h-[100vh] justify-items-center  ">
        <div className="self-end">
          <img src="../../HandsShow.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col text-center text-black items-center gap-4  md:mt-0 bg-white border-l border-gray-300 shadow-2xl shadow-gray-300 h-screen justify-center w-[90%] md:w-[100%] justify-self-center">
          <Login />
          <div className="flex items-center justify-between w-[50%]">
          <p className="border-b border-gray-700 w-[45%]"></p>
          <p>Or</p>
          <p className="border-b border-gray-400 w-[45%]"></p>
          </div>
          <div className="flex flex-row gap-6 items-center  p-4 justify-center  py-1 ">
            <Link to={`${oauthUrl}/api/v1/auth/google`}>
              <FcGoogle
                size={34}
              />{" "}
            </Link>

            <a href={`${oauthUrl}/api/v1/auth/github`}>
              <BsGithub size={34} />
              {/* <img className="w-[35px]" src="../../github.png" alt="" /> */}
            </a>
            <a href={`${oauthUrl}/api/v1/auth/facebook`}>
              {/* className="p-1 rounded-full bg-white " */}
              <BsFacebook size={34} />
              {/* <img className="w-[35px]" src="../../fb.jpg" alt="" /> */}
            </a>
            <a href={`${oauthUrl}/api/v1/auth/linkedin`}>
              <FaLinkedin color="blue" size={34} />
              {/* <img className="w-[35px]" src="../../link.png" alt="" /> */}
            </a>
          </div>
          <Link to={"/forgotpassword"}>
            <p className="text-lg font-semibold hover:cursor-pointer ">
              Forgot password?
            </p>
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="underline text-green">
              Sign up
            </Link>{" "}
          </p>
      </div>
    </div>
  );
};

export default Loginpage;
