const axios = require("axios");
require("dotenv").config();

const localRegister = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${process.env.BACKEND}/api/v1/auth/register/`,
      data
    );
    return response.data;
  } catch (error) {
    return new Error(`Failed to register user: ${error}`);
  }
};

module.exports = localRegister;
