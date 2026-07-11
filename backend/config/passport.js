const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../lib/prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // This function runs AFTER Google confirms who the user is.
      // "profile" contains their Google info: id, displayName, emails, etc.
      try {
        const email = profile.emails[0].value;

        // Check if a user with this email already exists (e.g. registered via bcrypt earlier)
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // New user signing in via Google for the first time — create an account.
          // No real password exists, so we store a random unusable placeholder hash.
          user = await prisma.user.create({
            data: {
              email,
              password: "GOOGLE_OAUTH_NO_PASSWORD", // never used to log in with bcrypt.compare
            },
          });
        }

        return done(null, user); // success — pass user along to the next step
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// These two functions manage what gets stored in the session cookie during the handshake
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

module.exports = passport;