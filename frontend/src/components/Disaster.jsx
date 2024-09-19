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
      {disasters.map((disaster) => {
        const date = new Date(disaster.startDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return <div key={disaster.id} className="py-4">
          <div className="flex justify-between">
            <Link to={`/disasters/${disaster.id}`}>
              {" "}
              <h2 className="capitalize font-bold text-[#047857] md:text-2xl text-xl">
                {disaster.region + ", " + disaster.country}: {disaster.disasterType} - {formattedDate}
              </h2>
            </Link>
            <button className="border-2 w-fit max-sm:hidden rounded-md border-gray-500 px-2">View details</button>
          </div>
          <div className="md:flex w-[100vw] capitalize gap-x-4 max-sm:gap-x-2 text-xl md:px-2 font-serif">
            <p className={status[disaster.status]}>
              <span className="font-semibold text-[#434343]">Status: </span>
              {disaster.status? disaster.status: "undetermined"}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Disaster Type:{" "}
              </span>
              {disaster.disasterType}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Affected Country:{" "}
              </span>
              {disaster.country}
            </p>
          </div>
        </div>
      })}
    </div>
  );
};

Disasters.propTypes = {
  disasters: PropTypes.array,
};

export default Disasters;
