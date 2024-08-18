// AuthRoute.js
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import PropTypes from "prop-types"

const AuthRoute = ({ element: Component }) => {
  const isAuthenticated =  !!Cookies.get("accessToken");

  return isAuthenticated ? Component : <Navigate to="/login" />;

};

AuthRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default AuthRoute;
