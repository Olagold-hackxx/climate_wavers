const jwt = require("jsonwebtoken");

// create jwt
const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES_IN,
  });
  return token;
};

//validate jwt
const isTokenValid = (token) =>
  jwt.decode(token, (err, decoded) => {
    if (err) {
      console.error("Failed to decode access token:", err);
    } else {
      console.log("Decoded Access Token:", decoded);
    }
  });

//create cookies with jwt and attach to response
const attachCookiesToResponse = ({ res, user }) => {

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("user", JSON.stringify(user), {
    httpOnly: false,
    sameSite: 'None',
    secure: true,
    signed: false,
    domain: process.env.DOMAIN,
    expires: new Date(Date.now() + oneDay),
    encode: (cookie) => cookie,
  });

  res.cookie("accessToken", user.access_token, {
    httpOnly: false,
    sameSite: 'None',
    secure: true,
    signed: false,
    domain: process.env.DOMAIN,
    expires: new Date(Date.now() + longerExp),
    encode: (cookie) => cookie,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
