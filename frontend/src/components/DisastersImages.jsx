import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlaceholderImage from '../../public/placeholde-disaster-img.jpg'

const DisasterImages = ({ disasters }) => {
  return (
    <div className="flex gap-x-2  py-8 max-w-screen overflow-x-auto">
      {disasters.map((disaster) => (
        <div key={disaster.id} className="p-12" >
          <img alt="" className="border-2 rounded-xl shadow-2xl min-w-[35vw] max-sm:min-w-[87vw] " src={disaster.images?.length?disaster.images[0]:PlaceholderImage} />
          <div className="text-white relative px-8 bottom-[55%]">
          <span className="relative font-semibold md:bottom-[5rem] text-xl">Trending Now</span>
          <h2 className="font-bold  text-2xl ">{disaster.region}, {disaster.country} - {disaster.disasterType}</h2>
          <p>{disaster.details}</p>
          <Link to={`/disasters/${disaster.id}`}><button className="rounded-lg bg-[#008080] w-fit h-12  px-4" > See details</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

DisasterImages.propTypes = {
  disasters: PropTypes.array,
};

export default DisasterImages;
