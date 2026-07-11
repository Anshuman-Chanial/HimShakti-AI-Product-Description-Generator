const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  // 1. Get the Authorization header — expected format: "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // 2. Extract just the token part (strip "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify signature + expiry using the same secret used to sign it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded payload to req, so later route handlers know who's calling
    req.user = decoded; // { userId, email, iat, exp }

    next(); // token is valid — let the request continue to the actual route
  } catch (err) {
    // jwt.verify throws if signature is invalid OR token expired
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = requireAuth;