import { useRef } from "react";
import MessageCard from "./message-card";
import PropTypes from "prop-types";
import NewChat from "./NewChat";
import ChatInput from "./ChatInput";

const Chatcomponent = ({ messages, handlePostMessage, handleCreateChat, current }) => {
  const bodyRef = useRef();

  return (
    <div className="max-h-fit h-[100%] flex flex-col justify-between">
      <div className="overflow-auto max-sm:w-[90vw] message-card-list">
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
      {current ? (
        <ChatInput
          body={bodyRef}
          handleClick={() => {
            handlePostMessage(bodyRef.current?.value);
            bodyRef.current.value = "";
          }}
        />
      ) : (
        <div className="chat-input-null">
          <ChatInput
            body={bodyRef}
            handleClick={() => {
              handleCreateChat
              handlePostMessage(bodyRef.current?.value);
              bodyRef.current.value = "";
            }}
          />
        </div>
      )}
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
