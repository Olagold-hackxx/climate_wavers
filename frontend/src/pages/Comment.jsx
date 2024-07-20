import Postcomponent from "../components/Postcomponent";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CommentPost from "../components/CommentPost";
// import { useLocation } from "react-router-dom";
import Createcomment from "../components/Createcomment";

const Comment = ({ type }) => {
  const { postId } = useParams();

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <CommentPost type="post" postId={postId} />
      <div className=" border-1 rounded-lg shadow-md shadow-[#008080] h-44 w-full mt-[-10px]">
        <Createcomment showCategory={false}/>
      </div>
    
      <Postcomponent type={type} postId={postId} />
    </div>
  );
};

Comment.propTypes = {
  type: PropTypes.string,
};

export default Comment;
