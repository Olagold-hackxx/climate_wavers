import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img src={"/Vector3.png"} className=" text-center text-2xl pt-20 px-2 " />
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>1/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative top-24 right-8">
          <img src={"/waverbot1.png"} className="w-[100%]" />
          <img src={"/Ellipse.png"} className="w-[100%] ml-2 " />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Welcome to Climate Wavers!</span> Your
            journey begins here. Explore climate-related content, engage with
            the community, and contribute to global sustainability efforts.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit max-w-[40%]">
            <span className="font-bold">Your Central Hub! </span> Access all the
            latest updates, insights, and community activities on the Home page.
            Stay connected with what’s happening in the world of climate action.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[40%]">
            <span className="font-bold">Discover, Learn, Engage! </span> The
            Home page is your starting point for all things Climate Wavers. Dive
            into the latest posts, join discussions, and stay informed on
            climate issues.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/community"}
        className="bg-linear  w-[20%] h-16 relative left-[60%] bottom-20 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Home;
