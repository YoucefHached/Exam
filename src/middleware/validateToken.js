const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      if (!decoded.role === "Admin") {
        return res.status(401).json({ message: "Unuthorized" });
      }
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
