import PropTypes from "prop-types";

const ChatsListCard = ({ id, createdAt, handleClick, title, isCurrent }) => {
  return (
    <div
      onClick={() => {
        handleClick(id);
      }}
      className={`chat-list-card ${isCurrent && "active"}`}
    >
      <p className="title">{title}</p>
    </div>
  );
};

ChatsListCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
};
export default ChatsListCard;
