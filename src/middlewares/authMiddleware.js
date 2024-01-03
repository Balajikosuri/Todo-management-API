const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error_message: err.message });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
