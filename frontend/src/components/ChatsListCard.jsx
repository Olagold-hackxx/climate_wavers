import PropTypes from "prop-types";

const ChatsListCard = ({ id, createdAt }) => {
  const date = new Date(createdAt);
  return (
    <div style={{ border: "1px solid red" }} className="chats-list-card">
      <p style={{ fontSize: "18px", fontWeight: "480" }}>{id}</p>
      <p>{`${date.getDay()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()}`}</p>
    </div>
  );
};

ChatsListCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
};
export default ChatsListCard;
