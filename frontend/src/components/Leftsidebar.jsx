import Menu from "./Menu";
// import { getUser } from "../utils/factory";

const Leftsidebar = () => {
  //made this changes just to get by to integrate the chatbot
  // const user = getUser()

  return (
    <div className=" border-r-[1px] border-gray-200 hidden md:block w-[100%] h-[100vh] py-6">
      {/* Logo */}
      {/* <div className=" flex gap-3 items-center justify-self-center md:justify-self-start">
        <div className="w-[70px]">
          <img src="../../Vector.png" />
        </div>
        <div className="flex flex-col  font-semibold text-[24px]">
          <h1>Climate Wavers</h1>
        </div>
      </div> */}
      <Menu />
      {/* Name box */}
      
    </div>
  );
};

export default Leftsidebar;
