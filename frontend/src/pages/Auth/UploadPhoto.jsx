import { BsImageAlt } from "react-icons/bs";
import avatar1 from "../../assets/girl-avatar.svg";
import avatar2 from "../../assets/boy-avatar.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
      setImage(null);
    }
  };
  const onSubmit = () => {
    // Send data to API if needed
    // handleReportSubmission(data);
    const uploadFn = async () => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
      toast.info("Uploading Image..", {
        autoClose: 200,
      });
      await axios
        .patch(
          `${backendUrl}/api/v1/auth/user/`,
          { profile_pic: image },
          {
            headers,
            withCredentials: true,
          }
        )
        .then(async (response) => {
          toast.dismiss();
          toast.success("Profile Image Uploaded Successful 👌");
          console.log(response.data);
          setImagePreview(null)
          navigate("/")
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss();
          toast.error("An error occured 🤯");
        });
    };
    uploadFn()
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div className="bg-[#047857] h-[100vh] lg:w-[50%] md:w-[50%] hidden md:flex justify-center ">
        <div className="self-end">
          <img src="../../../HandsShow.png" alt="" />
        </div>
      </div>
      <div className="w-[90%] lg:w-[30%] md:w-[40%] py-8 lg:px-16 md:px-16 m-auto justify-center">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] font-[bold font-serif text-[#047857] text-start mb-8">
          Upload Profile Photo
        </h1>

        <div className="bg-gray-200 w-[80%] rounded-lg h-[30vh] mb-6 flex justify-center items-center">
          <input
            accept="image/*"
            id="upload-profile-image"
            type="file"
            hidden
            onChange={handleImageChange}
          />

          <label htmlFor="upload-profile-image">
            {imagePreview ? (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-[]] rounded-lg h-[30vh] py-2 flex justify-center"
                />
              </div>
            ) : (
              <BsImageAlt className="text-6xl text-gray-700" />
            )}
          </label>
        </div>

        <button
          onClick={onSubmit}
          className="bg-[#047857]  rounded-md text-white py-4 w-[80%]"
        >
          Confirm
        </button>
        <div className="flex items-center w-[80%] justify-between mt-4">
          <p className="border-b border-gray-400 w-[40%]"></p>
          <p>Or</p>
          <p className="border-b border-gray-400 w-[40%]"></p>
        </div>
        <div className="flex  w-[80%] justify-center items-center flex-col text-center">
          <p className="pt-1">Use our Virtual avatar</p>
          <div className="w-[100%] md:w-[70%]  lg:w-[80%]  flex gap-x-4  my-6 justify-between">
            <Link to="/">
              <img src={avatar2} alt="" className="w-[100%]" />
            </Link>
            <Link to="/">
              <img src={avatar1} alt="" className="w-[100%]" />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
