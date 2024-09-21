import { useEffect, useState } from "react";
import Chatcomponent from "../../components/Chatcomponent";

import "../styles/disax.css";
import { getUser } from "../../utils/factory";
import axios from "axios";
import {
  watchCollection,
  watchDocument,
} from "../../services/firebase.service";
import WaverxLeftBar from "./LeftSideBar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const chatbot = `${import.meta.env.VITE_APP_CHATBOT_URL}/api/v1`;

const WaverXChatPage = () => {
  const [chats, setChats] = useState([]);
  const [current, setCurrent] = useState("");
  const [messages, setMessages] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchChats().then((res) => {
      if (res.data) {
        const chats = res.data;
        const sorted = chats.sort((a, b) => b.createdAt - a.createdAt);
        setChats(sorted);
      }
    });
    if (current) {
      //firebase path to chat collection
      const path = `ChatMessages/${current}/messages`;
      watchCollection(path, (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          ...d.data(),
          remoteId: d.id,
        }));
        const sorted = data.sort((a, b) => a.postedAt - b.postedAt);
        console.log({ sorted });
        setMessages(sorted);
      });
    }
  }, [current]);

  // const messageBodyRef = useRef()

  async function fetchChats() {
    const url = `${chatbot}/chats?userId=${getUser()?.id}`;
    return axios.get(url);
  }

  function handleChatCardClicked(id) {
    console.log(id);
    setCurrent(id);
    setIsOpen(false);
    const path = `chats/${id}`;
    watchDocument(path, async function (data) {
      const chat = data.data();
      const chatsMock = [...chats];
      const chatIndex = chats.findIndex((c) => (c.id = chat.id));
      chatsMock[chatIndex] = chat;
      setChats(chatsMock);
    });
  }

  async function handleCreateChat() {
    const userId = String(getUser()?.id);
    const res = await axios.post(`${chatbot}/chats`, { userId });
    if (res.data) {
      setChats([res.data, ...chats]);
    }
    setCurrent(res.data.id);
    return res.data;
  }

  async function handlePostMessage(body, newCurrent) {
    if (!body) return;
    try {
      let url;
      if (newCurrent) {
        setCurrent(newCurrent);
        url = `${chatbot}/chats/${newCurrent}`;
      } else url = `${chatbot}/chats/${current}`;
      await axios.post(url, { body, userId: String(getUser()?.id) });
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className=" w-[100vw] text-black flex">
      <div className="md:hidden p-2">
        <HiOutlineMenuAlt1 size={35} onClick={() => setIsOpen(true)} />
        {isOpen === true ? (
          <WaverxLeftBar
            handleCreateChat={handleCreateChat}
            chats={chats}
            current={current}
            handleChatCardClicked={handleChatCardClicked}
            setIsOpen={setIsOpen}
          />
        ) : null}
      </div>

      <div className="hidden md:grid md:w-[25%] border-r-2 border-gray-200 ">
        <WaverxLeftBar
          handleCreateChat={handleCreateChat}
          chats={chats}
          current={current}
          handleChatCardClicked={handleChatCardClicked}
          setIsOpen={setIsOpen}
        />
      </div>

      <div className=" w-[75%] h-[100vh] max-sm:w-[100vw] max-sm:relative max-sm:right-8">
        <Chatcomponent
          current={current}
          messages={messages}
          handlePostMessage={handlePostMessage}
          handleCreateChat={handleCreateChat}
        />
      </div>
    </div>
  );
};

export default WaverXChatPage;
