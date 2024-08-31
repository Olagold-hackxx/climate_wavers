import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { getUser } from "../utils/factory";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { uploadFiles } from "../services/upload.service";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const Createcomment = ({ type, postId, parentId }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = getUser();
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setImageName(file.name);
    }
  };

  const toastMsg = {
    info: "Submitting post...",
    success: "Post Successful 👌",
    error: "An Error occured 🤯",
  };

  const onSubmit = async (data) => {
    let imageUrl;
    if (data.image[0]) {
      imageUrl = await uploadFiles(data.image[0]);
    }
    if (imageUrl) {
      if (imageUrl.length == 1) {
        data.image = imageUrl[0];
      } else {
        data.image = imageUrl;
      }
    }
    if (postId) data.post = postId;
    if (parentId) data.parent_comment = parentId;
    const endpoint = endpoints[type];
    try {
      await client.run("post", endpoint, data, true, toastMsg);
      reset();
      setImageName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-3 md:p-6 rounded-md d flex  w-[100%] max-md:w-[80vw] flex-col h-[100%]"
      >
        <div className=" flex justify-between gap-4">
          <div className=" flex justify-start gap-4 ">
            {/* <Accountcard user={user} /> */}
            <img
              src={user?.profile_picture}
              alt=""
              className="w-10 h-10 rounded-full"
            />

            <textarea
              type="text"
              placeholder="What's on your mind"
              className=" mb-3 text-inherit bg-inherit outline-0"
              {...register("content", { required: true })}
            />
          </div>

          <button
            className="px-10 h-[50px] capitalize max-sm:hidden mx-1 bg-[#008080]  text-white rounded-full cursor-pointer"
            type="submit"
          >
            {type === "post" ? type : "Reply"}
          </button>
          <IoSend
            size={34}
            className="md:hidden absolute right-4 cursor-pointer "
            color="#008080"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <div className=" flex justify-start gap-x-4 items-start ">
          <label htmlFor="image">
            <img
              src="../../img_user_rectangle_5.svg"
              alt="User"
              className="h-[24px] ml-2 w-[24px]"
            />
          </label>

          <img
            src="../../img_thumbs_up_rectangle_5.svg"
            alt="Thumbsup"
            className="h-[24px] w-[24px]"
          />
          <img
            src="../../img_emoji_normal.svg"
            alt="Emojinormal"
            className="h-[24px] w-[24px]"
          />
          <img
            src="../../img_linkedin.svg"
            alt="Linkedin"
            className="h-[24px] w-[24px]"
          />

          <input
            id="image"
            type="file"
            accept="image/*"
            className="p-0  hidden border rounded focus:border-green focus:outline-none"
            {...register("image", {
              required: false,
              onChange: handleImageChange,
            })}
          />
          <p>{imageName}</p>
        </div>
      </form>
    </>
  );
};

Createcomment.propTypes = {
  postId: PropTypes.string,
  parentId: PropTypes.string,
  type: PropTypes.string,
  closeModal: PropTypes.func,
};

export default Createcomment;
