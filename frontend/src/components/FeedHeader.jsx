import { useState } from "react";
import PropTypes from "prop-types";

const FeedHeader = ({ feeds }) => {
  const [feed, setFeed] = useState("");
  return (
    <div className=" text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold  ">
      <div className="text-black font-bold text-xl flex flex-row px-4 py-2 justify-between h-[100%] text-base">
        {feeds?.map((pageFeed) => (
          <div
            key={pageFeed}
            className={`cursor-pointer ${
              feed === pageFeed
                ? "border-b-4 text-capitalize border-[#008080]"
                : null
            } `}
            onClick={() => {
              setFeed(pageFeed);
            }}
          >
            {pageFeed}
          </div>
        ))}
      </div>
    </div>
  );
};

FeedHeader.propTypes = {
  feeds: PropTypes.array,
};

export default FeedHeader;
