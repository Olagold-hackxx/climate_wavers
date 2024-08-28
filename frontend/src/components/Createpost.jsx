import { useForm } from "react-hook-form";
import { useState } from "react";
import PropTypes from "prop-types";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { getUser } from "../utils/factory";
import { uploadFiles } from "../services/upload.service";
import { IoSend } from "react-icons/io5";

export default function Createpost({ type, postId, parentId, closeModal }) {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const user = getUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const toastMsg = {
    info: "Submitting post...",
    success: "Post Successful 👌",
    error: "An Error occured 🤯",
  };

  const onSubmit = async (data) => {
    let imageUrl
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
      await client.run("post", endpoint, data, true, toastMsg, false, false);
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onSubmit={handleSubmit(onSubmit)}
        className=" md:w-[40vw] md:min-h-[45vh] max-h-[70vh] p-3 md:p-6 bg-white rounded-md flex justify-between w-[70vw] flex-col"
      >
        <div className=" flex justify-start gap-4 ">
          <img
            src={
              user?.profile_pic
                ? user.profile_pic
                : user.profile_picture
            }
            alt=""
            className="w-12 h-12 rounded-full h-10"
          />
          <select
            className=" rounded-full p-2 mb-3 border-2 border-[#008080] text-xl font-bold text-[#008080] focus:border-green focus:outline-none"
            {...register("visibility", { required: true })}
          >
            <option value="Everyone">Everyone</option>
            <option value="Friends">Friends</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <textarea
          type="text"
          placeholder="What's on your mind"
          className=" p-8 border-b-2 h-[100%] text-black text-3xl  overflow-y-auto focus:border-b-2 focus:outline-none focus:border-[#008080]"
          {...register("content", { required: true })}
        />
        {imagePreview && (
          <div className="mb-3 max-h-[60%] overflow-y-auto">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <div className="flex justify-between items-center w-[100%]">
          <div className="flex justify-start gap-8 pt-4 h-14">
            <label htmlFor="image">
              <img
                src="../../img_user_rectangle_5.svg"
                alt="User"
                className="h-[28px] ml-2 w-[28px]"
              />
            </label>

            <img
              src="../../img_thumbs_up_rectangle_5.svg"
              alt="Thumbsup"
              className="h-[28px] w-[28px]"
            />
            <img
              src="../../img_emoji_normal.svg"
              alt="Emojinormal"
              className="h-[28px] w-[28px]"
            />
            <img
              src="../../img_linkedin.svg"
              alt="Linkedin"
              className="h-[28px] w-[28px]"
            />
            <input
              id="image"
              type="file"
              accept="image/*"
              className="p-0 mb-1 hidden border rounded focus:border-green focus:outline-none"
              {...register("image", { required: false, onChange: handleImageChange })}

            />
          </div>
          <button
            className="px-12 h-[60px] max-sm:hidden  bg-[#008080] text-white text-lg rounded-full cursor-pointer z-10"
            type="submit"
          >
            Post
          </button>
          <IoSend
            size={34}
            className="md:hidden absolute right-4 pt-1 cursor-pointer "
            color="#008080"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </>
  );
}

Createpost.propTypes = {
  closeModal: PropTypes.func,
  postId: PropTypes.string,
  type: PropTypes.string,
  parentId: PropTypes.string,
};
