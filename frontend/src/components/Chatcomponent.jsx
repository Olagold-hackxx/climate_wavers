import { useRef, useState, useEffect } from "react";
import MessageCard from "./message-card";
import PropTypes from "prop-types";
import NewChat from "./NewChat";
import ChatInput from "./ChatInput";

const Chatcomponent = ({
  messages,
  handlePostMessage,
  handleCreateChat,
  current,
}) => {
  const bodyRef = useRef();
  const [newCurrent, setCurrent] = useState(current);

  useEffect(()=> {
    setCurrent(current)
  }, [current])

  const handleClick = async (body) => {
    const newChat = await handleCreateChat();
    setCurrent(newChat.id);

    await handlePostMessage(body, newChat.id);
  };
  console.log(newCurrent)

  return (
    <div className="max-h-fit  h-[100%] max-sm:h-[97%]  max-sm:w-[90vw] flex flex-col justify-between">
      <div className="overflow-y-auto  mt-4 message-card-list">
        {!messages?.length ? (
          <NewChat handleClick={handleClick} />
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
      {newCurrent ? (
        <ChatInput
          body={bodyRef}
          handleClick={() => {
            handlePostMessage(bodyRef.current?.value);
            bodyRef.current.value = "";
          }}
        />
      ) : (
        <div className="">
          <ChatInput body={bodyRef} handleClick={handleClick} />
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
