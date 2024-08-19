import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getUser, getAuthToken } from "../utils/factory";
// import { uploadFiles } from "../services/upload.service";
import PropTypes from "prop-types";

// const rs_backend_url = import.meta.env.VITE_APP_CHATBOT_URL;

export default function Createpost({ closeModal }) {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const user = getUser();
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = getAuthToken();
  const [location, setLocation] = useState({});

  useEffect(() => {
    // Check if the browser supports geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          toast(error, {
            autoClose: 300,
          });
        }
      );
    } else {
      toast("Geolocation is not supported by your browser", {
        autoClose: 500,
      });
    }
  }, []);
  /*
  const aiAnalyze = async (data, postId) => {
    data["username"] = username;
    data["message"] = data.text;
    if (data.image) {
      data["image"] = data.picture[0];
    }
    data["postId"] = postId;
    data["location"] = location
      ? `${location.longitude},${location.latitude}`
      : "53.6,42.3";
    await axios
      .post(`${modelResponseUrl}/api/chatbot`, data)
      .then((response) => {
        console.log(response.data);
        Cookies.set("access_token", response.data.access_token);
        toast.success("DisaX just analyzed your report, check it out", {
          autoClose: 2500,
        });
      })
      .catch((error) => console.log(error));
  };
*/

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };
  const onSubmit = (data) => {
    // Send data to API if needed
    // handleReportSubmission(data);
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
      await axios
        .post(`${backendUrl}/api/v1/post/`, data, {
          headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          toast.dismiss();
          toast.success("Post Successful 👌");
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss()
          toast.error("Error occured 🤯");
        });
    };
    posterFn();
    // Reset the form after submission
    reset();
    closeModal();
  };

  // async function handleReportSubmission(data) {
  //   let imageUrl;
  //   if (data.image) {
  //     imageUrl = await uploadFiles(data.image);
  //   }
  //   console.log(data);
  //   if (data.category !== "happening") return;
  //   if (imageUrl) {
  //     if (imageUrl.length == 1) {
  //       data.image = imageUrl[0];
  //     } else {
  //       data.image = imageUrl;
  //     }
  //   }
  //   try {
  //     const url = rs_backend_url + "/posts";
  //     console.log(url);

  //     const payload = {
  //       ...data,
  //       username: getUser().username,
  //       userId: getUser().id,
  //       body: data.content,
  //       content: undefined,
  //       category: undefined,
  //     };

  //     await axios.post(url, payload);
  //     closeModal();
  //   } catch (err) {
  //     console.log(err, err.response);
  //   }
  // }

  console.log(location);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-3 md:p-6 bg-white rounded-md d flex  w-[30vw] flex-col"
      >
        <div className=" flex justify-between gap-4 ">
          <img
            src={user.profile_pic}
            alt=""
            className="w-10 rounded-full h-10"
          />
          <select
            className=" rounded-full p-2 mb-3 border text-lg text-[#008080] focus:border-green focus:outline-none"
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
          className=" p-8 mb-3 border text-black text-2xl rounded-2xl h-40 max-h-70 overflow-y-auto focus:border-[#000000] focus:outline-gray-500"
          {...register("content", { required: true })}
        />
        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <div className=" flex py-4 justify-start gap-4 ">
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
            className="p-0 mb-1 hidden border rounded focus:border-green focus:outline-none"
            {...register("image", { required: false })}
            onChange={handleImageChange}
          />

          <button
            className="px-10 ml-[40%] h-[50px] py-1 mx-1 bg-[#008080] text-white rounded-full cursor-pointer z-10"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}

Createpost.propTypes = {
  closeModal: PropTypes.func,
};
