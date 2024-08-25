const facebook = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");
const localRegister = require("../utils/register");
const ensureEmail = require("../utils/factory");

facebook.serializeUser(function (user, done) {
  done(null, user.id);
});

facebook.deserializeUser(function (user, done) {
  const currentUser = User.findOne({
    where: {
      id: user.id,
    },
  });
  done(null, currentUser);
});

facebook.use(
  new FacebookStrategy(
    {
      clientID: `${process.env.FB_CLIENT_ID}`,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/facebook/callback`,
      profileFields: ["id", "displayName", "name", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      try {
        // save user to db and return access token if user does not exist
        if (!profile._json.email) {
          profile._json.email = profile.name.givenName;
        }
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: ensureEmail(profile._json.email, "facebook"),
          },
        });
        if (userExists) {
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          await userExists.update(
            { auth_provider: "facebook" },
            {
              where: {
                email: ensureEmail(profile._json.email, "facebook"),
              },
            }
          );
          await userExists.save();
          existingToken = await Token.update(
            { refreshToken: accessToken },
            {
              where: {
                user_id: userExists.id,
              },
            }
          );
          return done(null, userDetails);
        }
        const username = `${profile.name.givenName}-${accessToken.slice(-5)}`;
        const data = {
          username: profile.username ? profile.username : username,
          email: ensureEmail(profile._json.email, "facebook"),
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          is_verified: true,
          gender: "male",
          password: accessToken.slice(-15),
          auth_provider: "facebook",
          country: profile._json.location
            ? profile._json.location
            : "United States",
          state: profile._json.location ? profile._json.location : "Georgia",
          picture: profile.photos[0].value,
          // cover: profile._json.picture.data.url,
        };
        // save user to db and return access token if user does not exist
        const user = await User.create(data)
          .then(async (res) => {
            data["password2"] =  accessToken.slice(-15);
            await localRegister(data);
            return res
          })
          .catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
          const userDetails = { id: user.id, email: user.email, accessToken };
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

module.exports = facebook;
