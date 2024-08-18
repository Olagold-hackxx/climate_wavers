import PropTypes from "prop-types";
// import { getTimeAgo } from "../utils/factory";

const ChatsListCard = ({ id, createdAt, handleClick, title, isCurrent }) => {
  // const date = new Date(createdAt);
  console.log(createdAt)
  return (
    <div onClick={()=>handleClick(id)} className={`chat-list-card ${isCurrent && "active"}`}>
      <p className="title">{title}</p>
      {/* <p>{`${date.getDay()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()}`}</p> */}
      {/* <p>{date}</p> */}
    </div>
  );
};

ChatsListCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
};
export default ChatsListCard;
