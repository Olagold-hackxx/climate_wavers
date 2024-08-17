import { useEffect, useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const VerifyResetRequest = () => {
  // const user = useParams();
  // const token = Cookies.get("token");
  // const location = useLocation();
  const { uid, token } = useParams();
  const [isValid, setValidity] = useState(true);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  Cookies.set("uid", uid)
  Cookies.set("reset_token", token)


  useEffect(() => {
    const verifyFn = async () => {
      toast.dismiss();
      toast.info("Sending code...");
      toast.dismiss();
      await axios
        .get(
          `${backendUrl}/api/v1/auth/password-reset-confirm/${uid}/${token}/`
        )
        .then(() => {
          toast.success("Succesful 👌 You can now reset your password", {
            autoClose: 100,
          });
          toast.dismiss();
          navigate("/resetpassword");
        })
        .catch((error) => {
          setValidity(false);
          console.log(error);
          toast.dismiss();
          toast.error("Confirmation failed 🤯, Please try again");
        });
    };
    verifyFn();
  });

  return (
    <div className="grid md:grid-cols-[3fr_4fr] grid-cols-[1fr] items-center ">
      <div className=" bg-[#008080]">
        <div className=" grid place-content-center h-[80vh] md:h-[100vh]">
          <img src="../../../logolargewhite.png" alt="" className="  z-10" />
          {/* Two bg boxes */}
          {/* <div className="absolute -top-5 -right-6 w-[700px] h-[700px] bg-radial-gradient opacity-95 rounded-full backdrop-blur-xl -z-0 border-none "></div> */}
          {/* <div className="absolute bottom-5 left-6 bg-black w-60 h-60 "></div> */}
        </div>
      </div>
      {isValid ? (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Confirming Password Reset✔</h1>
          <BiWinkSmile size={180} color="#008080" />
        </div>
      ) : (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Awww Snap, Invalid or expired link</h1>
          <FaRegSadTear size={180} color="#008080" />
        </div>
      )}
    </div>
  );
};

export default VerifyResetRequest;
