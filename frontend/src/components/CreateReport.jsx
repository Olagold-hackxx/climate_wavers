import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { Slider } from "@mui/material";
import PropTypes from "prop-types";

const CreateReport = ({ closeModal }) => {
  const { register, handleSubmit } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  // const user = getUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = () => {
    closeModal();
  };

  const severity = [
    {
      value: 0,
      label: "Mild",
    },
    {
      value: 5,
      label: "Moderate",
    },
    {
      value: 10,
      label: "Severe",
    },
  ];
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
  return (
    <div className="mb-12 md:w-[100%] h-[100%] px-12">
      <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-bold font-serif text-[#008080] text-center mb-8">
        Report Disaster
      </h1>
      <div className="grid place-content-center">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Type of disaster"
            variant="outlined"
            color="success"
            sx={{ mr: 1, width: "50" }}
            {...register("disaster_type", {
              required: true,
              maxLength: 50,
            })}
          />
          <div className="py-2 px-1">
            <h3 className="text-xl w-[35vw]">Situation</h3>
          <Slider
            aria-label="Custom marks"
            defaultValue={0}
            step={1}
            sx={{ m: 1, width: "100" }}
            valueLabelDisplay="auto"
            marks={severity}
            min={0}
            max={10}
            color="success"
          /></div>
          <TextField
            id="outlined-details"
            label="Details"
            sx={{ m: 2, width: "100" }}
            variant="outlined"
            multiline
            rows={4}
            color="success"
            {...register("details", { required: true, maxLength: 50 })}
          />
          <div className="bg-gray-200 w-[40%] rounded-lg h-[30vh] mb-6 flex justify-center items-center">
            <input
              accept="image/*"
              id="upload-profile-image"
              type="file"
              hidden
              onChange={handleImageChange}
            />

            <label htmlFor="upload-profile-image">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-[100%] rounded-lg h-[30vh] py-2 flex justify-center"
                />
              ) : (
                <BsImageAlt className="text-6xl text-gray-700" />
              )}
            </label>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#047857] rounded-md w-[80%] text-white py-4"
          >
            Report Disaster
          </button>
        </Box>
      </div>
    </div>
  );
};
CreateReport.propTypes = {
  closeModal: PropTypes.func,
};
export default CreateReport;
