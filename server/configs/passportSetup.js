import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

passport.use(
  new GoogleStrategy({
    callbackURL: "auth/google/redirect",
    clientID:
      "2971667661-hpmo6qvrmft7ur6gdapgm7bopvfo8ag3.apps.googleusercontent.com",
    clientSecret: "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",
  }),
  (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        console.log("user is: ", currentUser);
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          googleId: profile.id,
          username: profile.displayName,
          thumbnail: profile._json.image.url,
        })
          .save()
          .then((newUser) => {
            console.log("created new user: ", newUser);
            done(null, newUser);
          });
      }
    });
  }
);
