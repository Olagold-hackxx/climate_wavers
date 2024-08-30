import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img
        src={"/Vector3.png"}
        className=" text-center text-2xl relative top-32 pt-28 px-2 "
      />
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
          <img src={"/waverbot1.png"} className="lg:w-[100%] md:w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] ml-4 " />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md h-fit max-w-[40%]">
            <span className="font-bold">Your Climate Journey! </span>The Profile
            page is where you can manage your personal information, track your
            activity, and see your contributions to climate action.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Personalize Your Experience! </span>{" "}
            Update your profile to reflect your climate interests and
            activities. Your journey towards sustainability starts here
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Track Your Impact! </span>Use the
            Profile page to monitor your engagement and contributions on Climate
            Wavers. Celebrate your progress in the fight against climate change.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/grableg"}
        className="bg-linear  w-[20%] h-16 relative left-[60%] bottom-20 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Profile;
