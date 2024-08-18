import PropTypes from "prop-types";
// import { getTimeAgo } from "../utils/factory";

const ChatsListCard = ({ id, createdAt, handleClick }) => {
  const date = new Date(createdAt);
  return (
    <div onClick={()=>handleClick(id)} style={{ border: "1px solid red" }} className="chats-list-card">
      <p style={{ fontSize: "18px", fontWeight: "480" }}>{id}</p>
      {/* <p>{`${date.getDay()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()}`}</p> */}
      <p>{date}</p>
    </div>
  );
};

ChatsListCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
};
export default ChatsListCard;
