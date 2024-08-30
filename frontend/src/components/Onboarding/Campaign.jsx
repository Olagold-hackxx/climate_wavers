import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Campaign = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img src={"/Vector3.png"} className=" text-center text-2xl relative 2xl:top-[35vh] top-[40vh] pt-20 px-2 " />
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/wallet"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>6/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative  min-w-[25vw] top-14 right-8">
          <img src={"/waverbotlegs.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] ml-4 " />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md  h-fit max-w-[50%]">
            <span className="font-bold">Welcome to the Campaign Hub!</span> Here, you can initiate or join
            campaigns aimed at supporting climate action and disaster relief.
            Your involvement can make a significant impact—start a campaign
            today!
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-2  rounded-2xl shadow-md  h-fit  max-w-[50%]">
          <span className="font-bold"> Join Forces for Change!</span> Explore ongoing campaigns or start your own
            to drive environmental initiatives. Together, we can mobilize
            support for meaningful climate solutions.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-2  rounded-2xl shadow-md  h-fit  max-w-[50%]">
          <span className="font-bold">Empower Your Community!</span>Use the Campaign Hub to rally support for
            the causes you care about. Create campaigns, set goals, and track
            progress as we work towards a sustainable future.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/disasters"}
        className="bg-linear  w-[20%] h-16 relative self-end left-[70%] bottom-32 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Campaign;
