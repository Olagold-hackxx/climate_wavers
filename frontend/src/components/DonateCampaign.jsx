import Donate from "./Donate";

const DonateCampaign = ({ campaign }) => {
  // console.log(campaign);
  return (
    <div className="md:w-[70vw] md:h-[70vh] flex p-4">
      <div
        className="bg-cover overflow-hidden hidden md:flex border-2 rounded-3xl text-white h-[100%] w-[120%] flex flex-col justify-end"
        style={{ backgroundImage: `url(${campaign.image})` }}
      >
        <div className="px-4 text-lg flex flex-col items-start ">
          <div className="font-bold py-2">
            Location:
            <p className=" text-start leading-5">{campaign.location}</p>
          </div>
          <div className="font-bold pb-2">
            Disaster:
            <p className="leading-4  text-start text-sm">{campaign.disaster}</p>
          </div>
          <div className="font-bold pb-2">
            Date:
            <p className=" text-start py-2 font-bold">{campaign.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 border-r-2 rounded-xl">
          <div className="border-[6px] w-[200%] border-[#2A9D8F] "></div>
          <div className="border-[6px] border-gray-400 w-[100%]"></div>
        </div>
      </div>
      <div className="flex flex-col font-montserrat justify-between">
        <div className="flex text-xl items-start py-4 flex-col gap-y-6 max-sm:w-[80vw]  md:px-4">
          <div >{campaign.title}</div>
          <div >Goal Amount: ${campaign.amount}</div>
          <div >Amount Raised: ${campaign.raised}</div>
          <div className="text-start">Campaign Details: <span >{campaign.details}</span></div>
        </div>
        {/* <button className="rounded-full w-[60%] h-[60px] text-white self-center bg-[#008080]">Donate</button> */}
        <div className="px-8 py-4">
        <Donate id={campaign.id} />
        </div>
      </div>
    </div>
  );
};

export default DonateCampaign;
