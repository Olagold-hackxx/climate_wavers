import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Disasters = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img src={"/Vector3.png"} className=" text-center text-2xl relative top-[190%] pt-20 px-2 " />
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/campaigns"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>7/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative min-w-[25vw] top-14">
          <img src={"/waverbotlegs.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] ml-4 " />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[50%]">
            <span className="font-bold">Stay Alert, Stay Safe! </span> The
            Disaster page keeps you informed about ongoing and potential
            climate-related disasters. Get real-time updates and take action to
            protect your community.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[50%]">
            <span className="font-bold">Monitor & Respond! </span> Keep track of
            disaster alerts and reports in real-time. Your awareness and quick
            response can help minimize the impact on your community.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[50%]">
            <span className="font-bold"> Be Prepared! </span> Access vital
            information on climate disasters in your area. Stay informed and
            take proactive measures to safeguard against environmental hazards.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/notifications"}
        className="bg-linear  w-[20%] h-16 relative self-end left-[70%] bottom-32 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Disasters;
