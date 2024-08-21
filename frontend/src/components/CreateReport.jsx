import { useForm } from "react-hook-form";
// import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CreateReport = () => {
  const { register, handleSubmit } = useForm();
  // const [imagePreview, setImagePreview] = useState(null);
  // const user = getUser();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //   } else {
  //     setImagePreview(null);
  //   }
  // };

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
    <div className=" self-center mb-12 md:w-[100%] px-12">
      <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-bold font-serif text-[#008080] text-center mb-8">
        Report Disaster
      </h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex justify-between w-[100%]">
          <TextField
            id="outlined-basic"
            label="Type of disaster"
            variant="outlined"
            color="success"
            sx={{ mr: 1, width: "50%" }}
            {...register("first_name", { required: true, maxLength: 50 })}
          />
          <TextField
            id="outlined-location"
            label="Location"
            sx={{ ml: 1, width: "50%" }}
            variant="outlined"
            color="success"
            {...register("last_name", { required: true, maxLength: 50 })}
          />
          </div>
          <TextField
            id="outlined-details"
            label="Details"
            sx={{ m: 2, width: "100"}}
            variant="outlined"
            color="success"
            {...register("username", { required: true, maxLength: 50 })}
          />

        <button
          onClick={handleSubmit()}
          className="bg-[#047857] rounded-md text-white py-4"
        >
          Report Disaster
        </button>
      </Box>
    </div>
  );
};

export default CreateReport;
