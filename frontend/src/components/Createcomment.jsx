import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { getUser, getAuthToken } from "../utils/factory";

const Createcomment = ({ postId, parentId, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const user = getUser();
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();

  console.log(useParams());
  const onSubmit = (data) => {
    const posterFn = async () => {
      toast.info("Submitting post...", {
        autoClose: 200,
      });
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
      console.log(data.image);
      if (!data.image[0]) {
        delete data.image;
        console.log(data);
      } else {
        data.image = data.image[0];
      }
      data.post = postId;
      if (parentId) data.parent_comment = parentId;
      await axios
        .post(`${backendUrl}/api/v1/comments/`, data, {
          headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          toast.dismiss();
          toast.success("Comment Successful 👌");
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss();
          toast.error("Error occured 🤯");
        });
    };
    posterFn();
    // Reset the form after submission
    reset();
    closeModal();
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
  showCategory: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Createcomment;
