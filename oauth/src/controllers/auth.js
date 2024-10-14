const Token = require("../models/Token");
const User = require("../models/User");
const axios = require("axios");
const { attachCookiesToResponse } = require("../utils/jwt");
const TokenError = require("../errors/tokenError");
const loginLocal = require("../utils/login");
const localRegister = require("../utils/register");
const ensureEmail = require("../utils/factory");

const oauthSignIn = async (req, res) => {
  try {
    const user = req.user;
    // check for existing refresh token
    const existingToken = await Token.findOne({ where: { user_id: user.id } });

    if (existingToken === null || existingToken.refreshToken === null) {
      const error = new TokenError(
        "Session expired, Please reauthenticate your account"
      );
      throw error;
    }
    let user_login = await User.findOne({ where: { id: user.id } });
    let user_details = await loginLocal({
      email: user_login.email,
      password: user_login.password,
    });
    attachCookiesToResponse({ res, user: user_details });
    if (user.status === 204) {
      return res.redirect(`${process.env.HOMEPAGE}/onboarding`);
    }
    return res.redirect(process.env.HOMEPAGE);
  } catch (err) {
    console.log(err);
    return res.redirect(`${process.env.HOMEPAGE}/login`);
  }
};

const getUserData = (req, res) => {
  const user = req.session.user;
  return res.status(200).json({ user });
};

const linkedInOauth = async (req, res, next) => {
  try {
    //here we get this code from passport linkedin strategy.
    const code = req.query.code;

    const redirectUri = `${process.env.BASE_URL}/api/v1/auth/linkedin/callback`;
    let accessToken;
    let userInfo;
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    //step 2 : access token retrieval
    const accessTokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;
    accessToken = await axios
      .post(accessTokenUrl)
      .then((res) => {
        return res.data.access_token;
      })
      .catch((err) => {
        console.log(err);
      });
    //Fetching User Data
    const userInfoUrl = `https://api.linkedin.com/v2/userinfo`;
    if (accessToken) {
      userInfo = await axios
        .get(userInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          return response.data;
          // res.send(res.data);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    } else {
      console.log("access token not found");
      return res.status(400).json({ error: "access token not found" });
    }
    if (userInfo) {
      if (!userInfo.email) {
        const emailNotFound = {
          message:
            "Please add a public email to your LinkedIn account to sign in in with LinkedIn",
        };
        req.flash("error", emailNotFound);
        return redirect(`${process.env.BASE_URL}/error`);
      }
      // return access token if user already exists
      const userExists = await User.findOne({
        where: {
          email: userInfo.email,
        },
      });
      if (userExists) {
        await userExists.update(
          { auth_provider: "linkedin" },
          {
            where: {
              email: ensureEmail(userInfo.email, "linkedin"),
            },
          }
        );
        await userExists.save();
        // generate an jwt token for user
        const userDetails = {
          id: userExists.id,
          email: userExists.email,
          status: 200,
          accessToken,
        };
        if (accessToken) {
          let existingToken = await Token.findOne({
            where: { user_id: userExists.id },
          });
          if (existingToken) {
            existingToken.refreshToken = accessToken;
            existingToken.save();
          } else {
            await Token.create({
              refreshToken: accessToken,
              user_id: userExists.id,
            });
          }
        }
        req.user = userDetails;
        return next();
      }
      const data = {
        username: `${userInfo.given_name}-${accessToken.slice(-4)}`,
        email: ensureEmail(userInfo.email, "linkedin"),
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        is_verified: userInfo.email_verified,
        password: accessToken.slice(-15),
        gender: "male",
        country: userInfo.locale.country
          ? userInfo.locale.country
          : "United States",
        state: userInfo.locale.country ? userInfo.locale.country : "Georgia",
        picture: userInfo.picture,
        // cover: userInfo.picture,
        auth_provider: "linkedin",
      };
      // save user to db and return access token if user does not exist
      const user = await User.create(data)
        .then(async (res) => {
          data["password2"] = accessToken.slice(-15);
          await localRegister(data);
          return res;
        })
        .catch((err) => {
          console.log(err.message);
        });

      await Token.create({
        refreshToken: accessToken,
        UserId: user.id,
      });
      const userDetails = {
        id: user.id,
        email: user.email,
        status: 204,
        accessToken,
      };
      req.user = userDetails;
      return next();
    }
    return res.status(400).json({ error: "User not found" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  oauthSignIn,
  linkedInOauth,
  getUserData,
};
