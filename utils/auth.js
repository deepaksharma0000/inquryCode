require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const pool = require("../config/dbConfig");
const Knex = require("../config/knex");

const accessSecret = process.env.accessSecret;

const auth = async (req, res, next) => {
  try {
    const access = req.header("x-access-token");

    if (!access) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    // Verify token
    const decoded = jwt.verify(access, accessSecret);

    // Fetch user from DB using Knex
    const query = Knex("users")
      .select("*")
      .where({ id: decoded.id })
      .limit(1)
      .toString();

    const [userRows] = await pool.query(query);
    const user = userRows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid user ID in token" });
    }

    req.id = decoded.id;
    req.user = user;
    next();
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Access token has expired!" });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid access token!" });
    } else {
      console.error("Auth Middleware Error:", error);
      return res.sendStatus(500);
    }
  }
};

module.exports = auth;
