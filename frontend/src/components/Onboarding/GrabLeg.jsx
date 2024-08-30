import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const GrabLeg = () => {
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
          <img src={"/waverbot1.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] " />
        </div>
        <div className="flex flex-col relative text-xl leading-6 right-24 text-start text-xl leading-5 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md max-h-[50%] h-14  w-[100%]">
          Give me a moment while I grab my legs 😅
          </span>
        
        </div>
      </div>
      <NavLink
        to={"/onboarding/botleg"}
        className="bg-linear  w-[15%] h-16 relative left-[75%] self-start text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default GrabLeg;
