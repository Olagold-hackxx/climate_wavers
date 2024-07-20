import React from "react";
import { BiWinkSmile } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";


const Emailconfirmation = () => {


  return (
    <div className="grid md:grid-cols-[3fr_4fr] grid-cols-[1fr] items-center ">
      <div className=" bg-gradient-to-r from-slate-900 to-slate-700">
       <div className="bg-radial2  grid place-content-center h-[80vh] md:h-[100vh]">
        <img src="../../../logolargewhite.png" alt="" className="  z-10" />
        {/* Two bg boxes */}
        {/* <div className="absolute -top-5 -right-6 w-[700px] h-[700px] bg-radial-gradient opacity-95 rounded-full backdrop-blur-xl -z-0 border-none "></div> */}
        {/* <div className="absolute bottom-5 left-6 bg-black w-60 h-60 "></div> */}
      </div>
      </div>
      {isValid ? (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Confirming email✔</h1>
          <BiWinkSmile size={180} color="#008080" />
        </div>
      ) : (
        <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
          <h1 className="text-4xl ">Awww Snap, invalid or expired token</h1>
          <FaRegSadTear size={180} color="#008080" />
        </div>
      )}
    </div>
  );
};

export default Emailconfirmation;
