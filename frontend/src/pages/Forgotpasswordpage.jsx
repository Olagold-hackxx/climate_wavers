import Forgotpassword from "../components/Forgotpassword";

const Forgotpasswordpage = () => {
  
  return (
    <div className="grid text-white md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center ">
      <div className="bg-[#047857] grid h-[80vh] md:h-[100vh] justify-items-center  ">
        <div className="self-end">
        <img src="../../HandsShow.png" alt=""  />
      </div>
      </div>
      <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0  bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
        <>
          <h1 className="text-2xl font-semibold mb-3 mt-8 md:mt-0 ">
            Forgot password
          </h1>
          <Forgotpassword />
        </>
      </div>
    </div>
  );
};

export default Forgotpasswordpage;
