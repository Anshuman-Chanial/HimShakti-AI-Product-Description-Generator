const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const prisma = require("../lib/prisma"); // your existing singleton
const passport = require("../config/passport");

const router = express.Router();

// Rate limiter: max 5 attempts per 15 min, applied to both auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 9, // limit each IP to 5 requests per windowMs
  message: { error: "Too many attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ---------- REGISTER ----------
router.post(
  "/register",
  authLimiter,
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  ],
  async (req, res) => {
    // 1. check validation results from the rules above
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 2. hash the password — NEVER store req.body.password directly
      const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

      // 3. create the user with the HASH, not the plain password
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      // 4. never send the password hash back in the response
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      // Prisma throws a unique constraint error (P2002) on duplicate email
      if (err.code === "P2002") {
        return res.status(400).json({ error: "Email already registered" });
      }
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// ---------- LOGIN ----------
router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 1. find the user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        // deliberately vague — don't reveal whether it was email or password that was wrong
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // 2. compare the plain password they typed against the stored HASH
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // 3. credentials good — sign a JWT containing the user's id + email
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// ---------- GOOGLE OAUTH ----------

// Step A: user clicks "Sign in with Google" → hits this → redirects to Google's consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step B: Google redirects back here after user approves
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    // req.user was set by the passport strategy above (the Prisma user record)
    const token = jwt.sign(
      { userId: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect back to the frontend, passing the token as a URL query param
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

module.exports = router;