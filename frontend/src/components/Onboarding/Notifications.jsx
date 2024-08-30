import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] place-content-center w-[100%] text-white">
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/disasters"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>8/8</span>
       
      </div>
      <img src={"/Vector3.png"} className=" text-center text-2xl relative top-[38vh] px-2 " />

      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative min-w-[25vw] top-14">
          <img src={"/Waverbotfull.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] " />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit   max-w-[50%]">
            <span className="font-bold">Stay Updated! </span>
            Notification page keeps you informed about important updates,
            alerts, and activities within the Climate Wavers community. Don’t
            miss a beat!
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit   max-w-[50%]">
            <span className="font-bold">Real-Time Alerts! </span>
            Get notified about new campaigns, disaster alerts, WaverX posts and
            community activities. Your notifications keep you in the loop and
            ready to act.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit   max-w-[50%]">
            <span className="font-bold"> Never Miss an Update! </span>
            From new posts to disaster warnings, the Notification page ensures
            you’re always aware of what’s happening in the Climate Wavers
            ecosystem.
          </span>
        </div>
      </div>
      <NavLink
        to={"/"}
        className="bg-linear  w-[20%] h-16 relative self-end left-[70%] text-2xl text-center pt-4 rounded-[35px]"
      >
        Home
      </NavLink>
    </div>
  );
};

export default Notifications;
