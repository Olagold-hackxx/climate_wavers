import { useState, useEffect } from "react";
import { dummyNotification } from "../utils/dummies";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [feed, setFeed] = useState("all");

  const feeds = ["All", "WaverX", "Reports", "Donations", "Campaigns"];

  useEffect(() => {
    const dummyNotifications = dummyNotification;
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="grid">
        <div className="fixed z-30 max-sm:left-0 md:w-[57%] bg-white w-[100%]">
      <h2 className="md:text-4xl  text-2xl px-2 font-semibold py-8">Notifications</h2>
      <div className="text-black text-xl flex flex-row px-4 py-2 justify-between gap-x-4 h-[100%] text-base border-y-2 shadow-md py-4  overflow-x-auto">
        {feeds?.map((pageFeed) => (
          <div
            key={pageFeed}
            className={`cursor-pointer capitalize ${
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
      <div className="mt-44">
      {notifications.map((notices) => (
        <div
          key={notices.id}
          className="w-[100%] border-b-2 border-gray-200 p-4 "
        >
          <div className="flex gap-4">
            <img src={notices.image} className="w-12 h-12" />
            <p className="text-xl self-center capitalize">{notices.content}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
export default Notification;
