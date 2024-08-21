import Postcomponent from "./Postcomponent";
import FeedHeader from "./FeedHeader";
const Community = () => {

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <div className=" text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold  ">
        <FeedHeader />
        </div>
      {/* <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 font-semibold'/> */}
      <Postcomponent type={"post"}  />
    </div>
  );
};

export default Community;
