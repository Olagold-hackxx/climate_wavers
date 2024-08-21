import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { getUser } from "../utils/factory";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";

const Createcomment = ({ type, postId, parentId, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const user = getUser();

  const toastMsg = {
    info: "Submitting post...",
    success: "Post Successful 👌",
    error: "An Error occured 🤯",
  };

  const onSubmit = async (data) => {
    if (!data.image[0]) {
      delete data.image;
    } else {
      data.image = data.image[0];
    }
    if (postId) data.post = postId;
    if (parentId) data.parent_comment = parentId;
    const endpoint = endpoints[type]
    try {
      await client.run(
        "post",
        endpoint,
        data,
        true,
        toastMsg,
        false,
        false
      );
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
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
            <img src={user.profile_pic} alt="" className="w-10 h-10" />

            <textarea
              type="text"
              placeholder="What's on your mind"
              className=" mb-3 text-inherit bg-inherit outline-0"
              {...register("content", { required: true })}
            />
          </div>

          {imagePreview && (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          <button
            className="px-10 h-[50px] mx-1 bg-[#008080]  text-white rounded-full cursor-pointer"
            type="submit"
          >
            Post
          </button>
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
            {...register("image", { required: false })}
            onChange={handleImageChange}
          />
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
