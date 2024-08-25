const github = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");
const localRegister = require("../utils/register");
const ensureEmail = require("../utils/factory");

github.serializeUser(function (user, done) {
  done(null, user.id);
});

github.deserializeUser(function (user, done) {
  const currentUser = User.findOne({
    where: {
      id: user.id,
    },
  });
  done(null, currentUser);
});

github.use(
  new GitHubStrategy(
    {
      clientID: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile._json.email) {
          profile._json.email = profile._json.name.split(" ")[0];
        }
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: ensureEmail(profile._json.email, "github"),
          },
        });
        if (userExists) {
          await userExists.update(
            { auth_provider: "github" },
            {
              where: {
                email: ensureEmail(profile._json.email, "github"),
              },
            }
          );
          await userExists.save();
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          await Token.update(
            { refreshToken: accessToken },
            {
              where: {
                user_id: userExists.id,
              },
            }
          );
          return done(null, userDetails);
        }
        const data = {
          username: profile._json.login,
          email: ensureEmail(profile._json.email, "github"),
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1],
          bio: profile._json.bio,
          auth_provider: "github",
          country: profile._json.location
            ? profile._json.location
            : "United States",
          gender: "male",
          state: profile._json.location ? profile._json.location : "Georgia",
          password: accessToken.slice(-25),
        };
        const user = await User.create(data)
          .then(async (user) => {
            data["password2"] = accessToken.slice(-25);
            await localRegister(data);
            return user
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

module.exports = github;
