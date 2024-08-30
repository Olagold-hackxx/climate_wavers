import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const BotLeg = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <div className=" text-center text-2xl relative top-32 pt-20 px-2 " ></div>
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/community"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>3/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative top-14">
          <img src={"/waverbotlegs.png"} className="w-[20vw]" />
          <img src={"/Ellipse.png"} className="w-[20vw]  ml-4" />
        </div>
        <div className="flex flex-col gap-y-4 relative right-12 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md max-h-[50%] h-14  w-[100%]">
          Alright got my legs lets move on 😅
          </span>
        
        </div>
      </div>
      <NavLink
        to={"/onboarding/bot"}
        className="bg-linear  w-[20%] h-16 relative lg:left-[70%] bottom-20 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default BotLeg;
