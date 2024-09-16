import { useState, useEffect } from "react";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const backendSocket = import.meta.env.VITE_WSS_BACKEND;


  useEffect(() => {
    const getNotifications = async () => {
      const url = endpoints["notifications"];
      const res = await client.run("get", url, {}, true);
      console.log(res)
      setNotifications(res);
    };
    getNotifications()
  }, []);

  useEffect(() => {
    const djangoSocket = new WebSocket(backendSocket);

    djangoSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        setNotifications((prev) => [...prev, `Django: ${data.message}`]);
      }
    };

 
    
  }, [backendSocket]);

  return (
    <div className="grid">
      <h2 className="text-xl  py-12 px-4">Notifications</h2>

      {notifications.map((notices) => (
        <div
          key={notices.id}
          className="md:w-[100%] w-[100vw]  h-28 border-y-2  border-[#E6EAEE66] shadow-sm my-1 "
        >
          <div className="flex pt-4 px-8 gap-4">
<<<<<<< HEAD
            <img  alt="profile pic" src={notices.image} className="w-16" />
=======
            <img alt="profile pic" src={notices.image} className="w-16" />
>>>>>>> parent of e715992 (Notifications setup)
            <p className="text-xl self-center capitalize">{notices.content}</p>
          </div>
        </div>
      ))}
<<<<<<< HEAD
      </div>
=======
    </div>
>>>>>>> parent of e715992 (Notifications setup)
  );
};
export default Notification;
