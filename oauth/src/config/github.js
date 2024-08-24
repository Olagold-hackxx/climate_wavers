const github = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");

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
            email: profile._json.email,
          },
        });
        if (userExists) {
          await userExists.update({ isGithubUser: true });
          await userExists.save();
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          existingToken = await Token.update(
            { refreshToken: accessToken },
            {
              where: {
                UserId: userExists.id,
              },
            }
          );
          return done(null, userDetails);
        }

        console.log(accessToken)
;
        const data = {
          username: profile_json.login,
          email: profile._json.email,
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1],
          bio: profile._json.bio,
          auth_provider: "github",
          country: profile._json.location ? profile._json.location : "United States",
          state:  profile._json.location ? profile._json.location : "Georgia",
          password: accessToken.slice(-25),
          profile_pic: profile._json.avatar_url,
        };
        const user = await User.create(data)
          .then(async (res) => {
            await localRegister(data);
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
        if (user) {
          console.log(user);
          const userDetails = { id: user.id, email: user.email, accessToken };
          await Token.create({
            refreshToken: refreshToken,
            UserId: user.id,
          }).catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
          return done(null, userDetails);
        }
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    }
  )
);

module.exports = github;
