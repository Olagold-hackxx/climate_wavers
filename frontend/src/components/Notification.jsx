import { useState, useEffect } from "react";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";
import { getAuthToken } from "../utils/factory";
import { useNotifications } from "../context/NotificationContext";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { receiveNewNotification } = useNotifications();
  const navigate = useNavigate;

  const backendSocket = import.meta.env.VITE_WSS_BACKEND;

  const token = getAuthToken();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getNotifications = async () => {
      const url = endpoints["notifications"];
      const res = await client.run("get", url, {}, true);
      setNotifications(res);
      console.log(res);
    };
    getNotifications();
  }, []);

  useEffect(() => {
    const djangoSocket = new WebSocket(`${backendSocket}?token=${token}`);

    djangoSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        receiveNewNotification();
        setNotifications((prev) => [...prev, data]);
      }
    };
  }, [backendSocket, token, receiveNewNotification]);

  const noticeUrl = (notice) => {
    if (notice?.content?.post) {
      return `/${notice.content.post}/${notice.content.id}/comments`;
    } else if (notice?.notification_type === "follow") {
      return `/${notice?.content?.follower?.id}/profile`;
    } else if (notice?.content?.id) {
      return `/${notice.content.id}/comments`;
    }
  };

  return (
    <div className="grid">
      <div className="flex py-12 md:px-4 md:gap-x-4 gap-x-2 relative">
        <MdArrowBack onClick={handleGoBack} size={35}color={"#434343"} />
        <h2 className="text-2xl pb-4">Notifications</h2>
      </div>
      {notifications.map((notices) => (
        <div
          key={notices.id}
          className="md:w-[100%] w-[100vw]  h-28 border-y-2  border-[#E6EAEE66] shadow-sm  "
        >
          <Link to={noticeUrl(notices)}>
            <div className="flex pt-4 px-8 gap-x-4">
              <img
                alt="profile pic"
                src={notices.user.profile_picture}
                className="w-12"
              />
              <div className="flex flex-col">
                <p className="text-xl self-center">{notices.message}</p>
                <p className="text-sm text-gray-500 overflow-hidden capitalize">
                  {notices?.content?.content}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Notification;
