import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const status = {
  Ongoing: "text-[#FF4D4D]", // Bright red for ongoing disasters (high urgency)
  Alert: "text-[#FFA500]", // Orange for alerts (warning status)
  Past: "text-[#434343]", // Gray for past disasters (resolved)
};

const Disasters = ({ disasters }) => {
  return (
    <div className="flex flex-col w-full">
      {disasters.map((disaster, index) => (
        <div key={`${disaster.date}${index}`} className="py-4">
          <div className="flex justify-between">
            <Link to={`/disasters/${disaster.id}`}>
              {" "}
              <h2 className="capitalize font-bold text-[#047857] md:text-2xl text-xl">
                {disaster.location}: {disaster.title} - {disaster.date}
              </h2>
            </Link>
            <button className="border-2 w-fit max-sm:hidden rounded-md border-gray-500 px-2">View details</button>
          </div>
          <div className="md:flex w-[100vw] capitalize gap-x-4 max-sm:gap-x-2 text-xl md:px-2 font-serif">
            <p className={status[disaster.status]}>
              <span className="font-semibold text-[#434343]">Status: </span>
              {disaster.status}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Disaster Type:{" "}
              </span>
              {disaster.disaster_type}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Affected Country:{" "}
              </span>
              {disaster.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

Disasters.propTypes = {
  disasters: PropTypes.array,
};

export default Disasters;
