require("dotenv").config();
const { request } = require("express");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchseller = (req, res, next) => {
  // get the user from jwt token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "seller not logged in" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    request.seller = data.seller;
    next();
  } catch (error) {
    res.status(401).send({ error: "seller not logged in" });
  }
};

module.exports = fetchseller;
