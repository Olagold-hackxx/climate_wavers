import Postcomponent from "./Postcomponent";
import { useState

 } from "react";
const Community = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <div className=" text-lg md:text-xl border-gray-200 h-[60px] border-2 font-semibold  ">
      <div>
        <div className="text-black flex flex-row px-2  justify-between h-[100%] content-start text-base gap-8 ">
          <div
            className={`cursor-pointer ${
              category === "reports" ? "border-b-[2px] border-[#008080]" : null
            } `}
            onClick={() => {
              setCategory("reports");
            }}
          >
            Reports
          </div>
          <div
            className={`cursor-pointer ${
              category === "education"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("education");
            }}
          >
            Feeds
          </div>
          <div
            className={`cursor-pointer ${
              category === "community"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("community");
            }}
          >
            Community
          </div>
          <div
            className={`cursor-pointer ${
              category === "trending"
                ? "border-b-[2px] border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("trending");
            }}
          >
           Trending
          </div>
        </div>
        </div>
      </div>
      {/* <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 font-semibold'/> */}
      <Postcomponent category="community" />
    </div>
  );
};

export default Community;
