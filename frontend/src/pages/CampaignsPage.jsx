import Campaign from "../components/Campaign";
import Topbar from "../components/Topbar";
import { getCampaigns } from "../utils/factory";
import { useNavigate } from "react-router-dom";
import DonateCampaign from "../components/DonateCampaign";
import Modal from "../components/Modal";
import { useState } from "react";

const CampaignsPage = () => {
  const campaigns = getCampaigns();
  const [isModalOpen, setIsModalopen] = useState(false);
  const [campaign, setCampaign] = useState({});
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  const chooseCampaign = (campaign) => {
    setCampaign(campaign);
    console.log(campaign)
    setIsModalopen(true);
  };

  const filters = [
    "most popular",
    "africa",
    "asia",
    "europe",
    "south america",
    "north america",
    "antarctica",
  ];

  return (
    <div className="grid gap-y-3">
      <Topbar />
      <div className="flex justify-center px-4 pt-28">
        <img
          src="/arrow-left.png"
          className="absolute right-[95%] h-12 py-2"
          onClick={handleGoBack}
        />
        <h1 className="text-center bg-gradient-to-b from-green-500 py-2  via-geen-300 to-green-700 bg-clip-text text-transparent pt-4 text-4xl font-bold">
          Support Climate Action: Be the Change!
        </h1>
      </div>
      <h3 className="text-center text-xl font-serif p-2">
        Join our active campaigns and make a positive impact.
      </h3>
      <div className="flex text-xl py-4 font-serif justify-center gap-x-4 ">
        <div className="font-bold font-montserrat">Filter campaigns:</div>
        <div className="font-bold text-[#008080]">Newest</div>

        {filters.map((filter) => (
          <div key={filter} className="capitalize">
            {filter}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 pt-12 px-8 gap-x-4">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className={`w-[100%] p-1 ${
              index % 4 === 0 ? "translate-y-[-40px]" : ""
            } ${
              index % 4 === 3 ? "translate-y-[-40px]" : ""
            }  transform transition duration-500 ease-in-out z-10 relative`}
          >
            <div onClick={() => chooseCampaign(campaign)}>
              <Campaign campaign={campaign} />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalopen(false)}>
          <DonateCampaign
            campaign={campaign}
            closeModal={() => setIsModalopen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CampaignsPage;
