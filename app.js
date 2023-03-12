const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// controller functions
const userLogin = require("./controllers/userLogin.js");
const tramTimes = require("./controllers/tramTimes.js");
const fetchFave = require("./controllers/fetchFave.js");
const insertFave = require("./controllers/insertFave.js");
// const { OAuth2Client } = require("google-auth-library");

// request paths
app.get("/", tramTimes);
app.get("/login/:token", userLogin);
app.post("/insert", insertFave);
app.get("/fetch/:email", fetchFave);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = app;
