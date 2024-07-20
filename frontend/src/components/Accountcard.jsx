
const Accountcard = ({ user }) => {
  const [isFollow, setIsFollow] = useState(false);
 
  return (
    <div className="flex flex-row items-center px-3 py-1 justify-between ">
      <div className="flex flex-row items-center self-center ">
        <img
          src={user?.profile_pic ? user.profile_pic : "../../pic1.png"}
          className="mr-2 rounded-full h-12"
          alt="Profile Pic"
        />{" "}
        <div className="text-sm flex flex-col">
          <h3>
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-xs text-left text-gray-500">@{user?.username}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsFollow(!isFollow);
          handleFollow(user?.id);
        }}
        // style={followStyle}
        className={`bg-purple-500 text-xs text-white font-semibold py-2 px-3 ml-2  rounded-xl ${
          isFollow &&
          "bg-stone-100 outline outline-2 outline-stone-500 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
        } `}
      >
        {isFollow === true ? "Following" : "Follow"}
      </button>
    </div>
  );
};

Accountcard.propTypes = {
  user: PropTypes.object,
};

export default Accountcard;
