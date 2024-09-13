import Disasters from "../components/Disaster";
import DisasterImage from "../components/DisastersImages";
import { dummyDisasters } from "../utils/dummies";
import Topbar from "../components/Topbar";
import Menu from "../components/Menu";
import Footer from "../components/FooterBar";

const DisasterPage = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="md:pb-20 max-sm:pb-10">
        <Topbar />
      </div>

      <div className="flex w-full max-sm:pb-8">
        <div className="w-[20%] border-r-2 max-sm:hidden ">
          <Menu/>
        </div>
        {/* <Mainfeed/> */}
        <div className="md:w-[80vw] max-sm:w-full  px-2 md:items-center">
          <div className="2xl:h-[50%] md:h-[42%] h-[35vh]">
          <DisasterImage disasters={dummyDisasters} />
          </div >
          <div className=" flex">
            <input
              className="bg-graylight-300 h-[60px] placeholder:italic placeholder:text-slate-400 placeholder:px-4 px-2  md:w-[100%] w-[75%] outline-[2px]  border  focus:border-2  focus:outline-2 focus:outline-gray-300 border-gray-200 rounded-lg text-graydark "
              type="text"
              placeholder="🔍 Search disaster keywords"
            />
            <button className="bg-[#047857]  text-white font-serif border relative md:w-[20%] w-[25%] rounded-lg">
              Search
            </button>
          </div>
          <div>
            <h2 className="font-bold mt-8 py-4 border-b-2 self-end text-2xl  text-[#434343] leading-4 border-gray-300">
              Showing {} - {} of {} results{" "}
            </h2>
          </div>
          <Disasters disasters={dummyDisasters} />
        </div>
      </div>
      <div className="md:hidden">
      <Footer  />
      </div>
    </div>
  );
};

export default DisasterPage;
