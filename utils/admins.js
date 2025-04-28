require("dotenv").config();
const pool = require("../config/dbConfig");
const Knex = require("../config/knex");
const jwt = require("jsonwebtoken");

const checkPermissions = (module, permission) => {
  return async (req, res, next) => {
    try {
      let authToken = req.header("Authorization");
      if (!authToken) throw new Error("Token is not provided");

      authToken = authToken.replace("Bearer ", "");
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log("decoded", decoded);

      // Validate JWT payload
      if (!decoded.id) throw new Error("Invalid token: id not found");

      // Fetch user and role data
      const getQuery = Knex.from("users")
        .select("users.*", "roles.*")
        .where("users.id", decoded.id)
        .innerJoin("roles", "roles.id", "users.role_id")
        .toString();

      const result = await pool.query(getQuery);
      console.log("getQuery :::", getQuery);
      const user = result.rows[0];

      if (!user) throw new Error("User not found");

      // Role slug checking
      const readRoles = ["super_admin", "receptionist", "counselor", "senior_expert", "accountant"];

      if (permission === "super_admin" && readRoles.includes(user.slug)) {
        req.decoded = decoded;
        req.token = authToken;
        req.user = user;
        return next();
      }

      if (user.slug !== permission) {
        throw new Error("Permission denied");
      }

      req.decoded = decoded;
      req.token = authToken;
      req.user = user;
      next();
    } catch (error) {
      console.error("Auth error:", error);
      res.status(401).json({ message: error.message || "Unauthorized" });
    }
  };
};

module.exports = { checkPermissions };
