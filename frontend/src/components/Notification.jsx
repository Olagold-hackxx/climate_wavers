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
      <h2 className="text-4xl  font-semibold py-8">Notifications</h2>
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
  );
};
export default Notification;
