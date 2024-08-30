import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img src={"/Vector3.png"} className=" text-center text-2xl relative top-[27%] pt-24 px-2 " />
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/home"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>2/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative top-14">
          <img src={"/waverbot1.png"} className="w-[100%]" />
          <img src={"/Ellipse.png"} className="w-[89%] ml-4" />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Join the Conversation!  </span> The
            Connect with like-minded individuals in the
            Climate Wavers community. Share ideas, discuss topics, and
            collaborate on climate action.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Engage & Collaborate! </span> The
            The Community page is where you can interact
            with others who are passionate about the environment. Your voice
            matters—let’s make it heard!
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Build Connections! </span> The
            Whether you&apos;re looking to discuss climate
            issues or collaborate on projects, the Community page is your space
            to engage and make a difference.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/profile"}
        className="bg-linear  w-[20%] h-16 relative xl:left-[49vw] lg:left-[58vw] bottom-[10vh] text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Community;
