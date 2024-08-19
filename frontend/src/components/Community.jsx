import Postcomponent from "./Postcomponent";
import { useState

 } from "react";
const Community = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <div className=" text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold  ">
        <div className="text-black font-bold text-xl grid grid-cols-4 px-2 py-2 justify-between content-end h-[100%] text-base gap-8 ">
          <div
            className={`cursor-pointer ${
              category === "reports" ? "border-b-4 border-[#008080]" : null
            } `}
            onClick={() => {
              setCategory("reports");
            }}
          >
            Feeds
          </div>
          <div
            className={`cursor-pointer ${
              category === "education"
                ? "border-b-4 border-[#008080]"
                : null
            } `}
            onClick={() => {
              setCategory("education");
            }}
          >
            Reports
          </div>
          <div
            className={`cursor-pointer ${
              category === "community"
                ? "border-b-4 border-[#008080]"
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
                ? "border-b-4 border-[#008080]"
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
      {/* <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 font-semibold'/> */}
      <Postcomponent type={"post"} />
    </div>
  );
};

export default Community;
