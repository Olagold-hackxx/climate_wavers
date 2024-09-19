import { useParams } from "react-router-dom";
import { dummyDisasters } from "../utils/dummies";
import Topbar from "../components/Topbar";
import Menu from "../components/Menu";
import Createcomment from "../components/Createcomment";
import Postcomponent from "../components/Postcomponent";

const DisasterPage = () => {
  const { disasterId } = useParams();
  const currentDisaster = dummyDisasters[disasterId - 1];

  

  return (
    <div className="w-full overflow-hidden">
    <div className="md:pb-20 pb-10">
      <Topbar />
    </div>

    <div className="flex w-full md:py-0 py-8">
      <div className="w-[20%] fixed border-r-2 h-full hidden md:flex ">
        <Menu/>
      </div>
      <div className="px-4 py-4 md:pl-[21%] grid gap-y-4">
      
      <h2 className="capitalize font-bold  md:text-2xl text-xl">
                {currentDisaster.location}: {currentDisaster.title} - {currentDisaster.date}
              </h2>
              <h3 className="capitalize text-[#047857] md:text-xl font-semibold">Description</h3>
      <div className="md:text-xl text-md font-serif">{currentDisaster.description}</div>
      <img alt="disaster_image" className="border-2 shadow-md rounded-md" src={currentDisaster.image} />
      <h4 className="py-2 font-semibold text-[#047857] text-xl">Comments</h4>

      <div className=" md:border-2 border-b-2 border-t-0 rounded-lg shadow-xl shadow-white h-40 py-4 ">
        <Createcomment type={"comments"} postId={1} parentId={1} button={"comment"}/>
      </div>
      <div className="">
        <Postcomponent type={"comments"} postId={1} comment={1} />
      </div>
      </div>
     
      </div>

    </div>
  );
};

export default DisasterPage;
