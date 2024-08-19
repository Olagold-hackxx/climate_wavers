// AuthRoute.js
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { Signin } from "../pages/Auth";

const AuthRoute = ({ element: Component }) => {
  const isAuthenticated = !!Cookies.get("accessToken");

  return isAuthenticated ? Component : <Signin />;
};

AuthRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default AuthRoute;
