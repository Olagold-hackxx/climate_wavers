import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Wallet = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4">
        <Link to={"/onboarding/bot"}>
          <img src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>5/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img src={"/skip.png"} className="" />
        </Link>
      </div>
      <img src={"/Vector3.png"} className=" text-center text-2xl relative xl:top-[30vh] top-[145%] left-4 pt-20 px-2 " />
      <div className="flex relative left-[30%] bottom-12 gap-4">
        <div className="flex flex-col  relative min-w-[25vw] top-14">
          <img src={"/waverbotlegs.png"} className="w-[80%]" />
          <img src={"/Ellipse.png"} className="w-[80%] ml-4" />
        </div>
        <div className="flex flex-col gap-y-4 text-start text-xl leading-6 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md h-fit max-w-[50%]">
            <span className="font-bold">Manage Your Contributions!</span> The Wallet page helps you track and
            manage your token contributions to various climate initiatives. Make
            every token count!
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-2  rounded-2xl shadow-md h-fit  max-w-[50%]">
          <span className="font-bold">Your Tokens, Your Impact! </span> Keep an eye on your token balance and see
            how your contributions are helping drive climate action. Every token
            brings us closer to a better world.
          </span>
          <span className="bg-[#008080]   px-2 border-0 py-2  rounded-2xl shadow-md h-fit  max-w-[50%]">
          <span className="font-bold">Support Climate Action!</span> Use the Wallet page to manage your tokens
            and contribute to the causes you care about. Your support fuels our
            mission for a sustainable planet.
          </span>
        </div>
      </div>
      <NavLink
        to={"/onboarding/campaigns"}
        className="bg-linear  w-[20%] h-16 relative self-end left-[70%] bottom-32 text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default Wallet;
