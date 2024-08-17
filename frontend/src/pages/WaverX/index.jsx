// import { useEffect, useState } from "react";
import Chatcomponent from "../../components/Chatcomponent";

import "../styles/disax.css";
// import { getUser } from "../../utils/factory";
// import axios from "axios";
// import { watchCollection } from "../../services/firebase.service";
import WaverxLeftBar from "./LeftSideBar";

// const chatbot = `${import.meta.env.VITE_APP_CHATBOT_URL}/api/v1`;

const WaverXChatPage = () => {
//   const [chats, setChats] = useState([]);
//   const [current, setCurrent] = useState("");
//   const [messages, setMessages] = useState();

//   useEffect(() => {
//     fetchChats().then((res) => {
//       res.data && setChats(res.data);
//     });
//     if (current) {
//       //firebase path to chat collection
//       const path = `ChatMessages/${current}/messages`;
//       watchCollection(path, (snapshot) => {
//         const data = snapshot.docs.map((d) => ({
//           ...d.data(),
//           remoteId: d.id,
//         }));
//         const sorted = data.sort((a, b) => a.postedAt - b.postedAt);
//         setMessages(sorted);
//       });
//     }
//   }, [current]);

//   // const messageBodyRef = useRef()

//   async function fetchChats() {
//     const url = `${chatbot}/chats?userId=${getUser()?.id}`;
//     return axios.get(url);
//   }

//   function handleChatCardClicked(id) {
//     setCurrent(id);
//   }

//   async function handleCreateChat() {
//     const userId = getUser()?.id;
//     console.log({ userId });
//     const res = await axios.post(`${chatbot}/chats`, { userId });
//     if (res.data) {
//       setChats([res.data, ...chats]);
//     }
//   }

//   async function handlePostMessage(body) {
//     if (!body) return;
//     try {
//       const url = `${chatbot}/chats/${current}`;
//       await axios.post(url, { body, userId: getUser()?.id });
//     } catch (err) {
//       console.log({ err });
//     }
//   }

  return (
    <div className=" w-[100vw] text-black flex">
      <div className=" w-[25%] border-r-2 border-gray-200">
        <WaverxLeftBar />
      </div>
      <div className=" w-[75%] h-[100vh]">
        <Chatcomponent />
      </div>
    </div>
  );
};

export default WaverXChatPage;
