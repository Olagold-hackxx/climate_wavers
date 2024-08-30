import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Chatbot = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <img
        src={"/Vector3.png"}
        className=" text-center text-2xl relative top-48 pt-28 px-2 "
      />
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/profile"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>4/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative min-w-[25vw] top-20 right">
          <img src={"/waverbotlegs.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] mr-4" />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[50%]">
            <span className="font-bold">Meet Your AI Assistant! </span> I&apos;m
            WaverX and I&apos;m here to help you navigate Climate Wavers. Ask
            questions, get updates, and learn more about climate and
            disaster-related topics with ease.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-4 rounded-2xl shadow-md h-fit  max-w-[50%]">
            <span className="font-bold">Your Personal Guide! </span> I&apos;m ready
            to assist you. Whether you need information or just want to chat, I,
            your AI companion is here to help. Interactive & Informative! Engage
            with the Bot for instant answers and updates on climate action.
            Engage with me for instant answers and updates on climate
            action.
          </span>
        
        </div>
      </div>
      <NavLink
        to={"/onboarding/wallet"}
        className="bg-linear  w-[20%] h-16 relative self-end left-[70%] bottom-44 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Chatbot;
