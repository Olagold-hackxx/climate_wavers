import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getAuthToken } from "../utils/factory";
import { dummyUser, dummyPost } from "../utils/dummies";

class Client {
  constructor(baseURL) {
    this.baseUrl = baseURL;
    this.token = getAuthToken();
  }

  async run(
    method,
    endpoint,
    data,
    authheaders,
    toastMsg = false,
    authCookies = false,
    mail = false
  ) {
    console.log(data);
    const client = axios.create({
      baseURL: this.baseUrl,
      method: method,
    });

    const config = {
      withCredentials: authheaders,
      data: data,
    };

    if (authheaders) {
      config.headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.token}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
    }

    try {
      let response;
      const backendStatus = import.meta.env.VITE_APP_BACKEND_STATUS === "true";
      if (!backendStatus && endpoint.endsWith("login/")) {
        if (
          data.email === dummyUser.email &&
          data.password === dummyUser.password
        ) {
          response = { data: dummyUser };
        }
      } else if (
        (!backendStatus && endpoint.endsWith("post/")) ||
        endpoint.endsWith("comments/")
      ) {
        response = { data: dummyPost };
      } else response = await client(endpoint, config);
      if (authCookies) {
        Cookies.set("accessToken", response.data.access_token);
        Cookies.set("user", JSON.stringify(response.data));
      }

      if (mail) {
        Cookies.set("email", data.email);
      }
      if (toastMsg) {
        toast.success(toastMsg.success, {
          autoClose: 200,
        });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      if (toastMsg) {
        toast.dismiss();
        toast.error(toastMsg.error);
      }
      throw error;
    }
  }
}

const client = new Client(import.meta.env.VITE_APP_BACKEND_URL);

export default client;
