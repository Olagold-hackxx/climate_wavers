import { useState, useEffect } from "react";
import { dummyNotification } from "../utils/dummies";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const dummyNotifications = dummyNotification;
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="grid">
      <h2 className="text-xl  py-12 px-4">Notifications</h2>
      
      {notifications.map((notices) => (
        <div
          key={notices.id}
          className="md:w-[100%] w-[100vw]  h-28 border-y-2  border-[#E6EAEE66] shadow-sm my-1 "
        >
          <div className="flex pt-4 px-8 gap-4">
            <img  alt="profile pic" src={notices.image} className="w-16" />
            <p className="text-xl self-center capitalize">{notices.content}</p>
          </div>
        </div>
      ))}
      </div>
  );
};
export default Notification;
