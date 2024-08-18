import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import MessageCard from "./message-card";
import PropTypes from "prop-types";
import NewChat from "./NewChat";

const Chatcomponent = ({ messages, handlePostMessage, current }) => {
  const bodyRef = useRef();

  return (
    <div className="max-h-fit h-[100%] flex flex-col justify-between">
      <div className="overflow-auto message-card-list">
        {!messages?.length ? (
          <NewChat />
        ) : (
          messages.map((m) => {
            return (
              <MessageCard
                postedBy={m.postedBy}
                key={m.remoteId}
                body={m.body}
                postedAt={m.postedAt}
              />
            );
          })
        )}
      </div>
      {current?<div className="bg-gray-100 p-1 h-[100px] border-0 border-t-2 border-gray-200 gap-x-8 rounded-md flex flex-row items-center shadow-2xl shadow-neutral-500/50">
        <img
          src="../../img_user_rectangle_5.svg"
          alt="User"
          className="h-[32px] ml-2 w-[32px]"
        />
        <img
          src="../../img_thumbs_up_rectangle_5.svg"
          alt="Thumbsup"
          className="h-[32px] w-[32px]"
        />
        <img
          src="../../img_emoji_normal.svg"
          alt="Emojinormal"
          className="h-[32px] w-[32px]"
        />
        <img
          src="../../img_linkedin.svg"
          alt="Linkedin"
          className="h-[32px] w-[32px]"
        />
        <input
          className="justify-self-end w-[65%] h-[65%] focus:outline-0 ml-4 pl-4 focus:bg-white rounded-full p-2 text-black "
          type="text"
          placeholder="Ask WaverX a question about climate"
          ref={bodyRef}
        />{" "}
        <IoSend
          size={34}
          onClick={() => {
            handlePostMessage(bodyRef.current?.value);
            bodyRef.current.value = "";
          }}
          className="items-end p-.5 ml-1 cursor-pointer "
          color="#008080"
          type="submit"
        />
      </div>: <div className="p-2" >
          <p>select a chat to continue conversation or create a new one</p>
        </div>}
    </div>
  );
};

Chatcomponent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      body: PropTypes.string,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]),
    })
  ),
  handlePostMessage: PropTypes.func.isRequired,
};

export default Chatcomponent;
