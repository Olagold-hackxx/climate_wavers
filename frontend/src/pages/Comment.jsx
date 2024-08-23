import Postcomponent from "../components/Postcomponent";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CommentPost from "../components/CommentPost";
import Createcomment from "../components/Createcomment";

const Comment = ({ type }) => {
  const { postId, commentId } = useParams();
  console.log({postId, type})

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <CommentPost type={type} postId={postId} />
      <div className=" border-2 border-t-0 rounded-lg shadow-xl shadow-white h-40 mt-[-10px] ">
        <Createcomment type={"comments"}  postId={postId} />
      </div>
      <div className="ml-8">

      <Postcomponent type={"comments"} postId={postId} comment={commentId}/>
      </div>
    </div>
  );
};

Comment.propTypes = {
  type: PropTypes.string,
};

export default Comment;
