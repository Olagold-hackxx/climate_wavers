const google = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");
const localRegister = require("../utils/register");

google.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: profile._json.email,
          },
        });
        if (userExists) {
          await userExists.update(
            { auth_provider: "google" },
            {
              where: {
                email: profile._json.email,
              },
            }
          );

          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            status: 200,
            accessToken,
          };
          if (refreshToken) {
            await Token.findOrCreate({
              defaults: { user_id: userExists.id },
              where: {
                refreshToken: refreshToken,
              },
            });
          }
          return done(null, userDetails);
        }
        console.log(profile);
        const username = `${profile._json.given_name}-${accessToken.slice(-5)}`;
        const data = {
          username: username,
          email: profile._json.email,
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          is_verified: profile._json.email_verified,
          password: accessToken.slice(-15),
          auth_provider: "google",
          gender: "male",
          country: profile._json.location
            ? profile._json.location
            : "United States",
          state: profile._json.location ? profile._json.location : "Georgia",
          picture: profile._json.picture,
          // cover: profile._json.picture,
        };
        console.log(data);
        const user = await User.create(data)
          .then(async (res) => {
            data["password2"] = accessToken.slice(-15);
            await localRegister(data);
            console.log(res);
            return res;
          })
          .catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
        const userDetails = {
          id: user.id,
          email: user.email,
          status: 204,
          accessToken,
        };
        await Token.create({
          refreshToken: accessToken,
          UserId: user.id,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
        return done(null, userDetails);
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    }
  )
);
module.exports = google;
