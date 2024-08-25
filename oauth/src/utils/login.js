const axios = require("axios");
require("dotenv").config();

const localLogin = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${process.env.BACKEND}/api/v1/auth/login/`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to login user: ${error}`);
    throw Error();
  }
};

module.exports = localLogin;
