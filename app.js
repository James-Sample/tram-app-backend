const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("./Models/dataSchema.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
// const { OAuth2Client } = require("google-auth-library");
// const jwt = require("jsonwebtoken");

const MY_KEY = process.env.REACT_APP_API_KEY;

app.get("/", (req, res) =>
  axios({
    method: "get",
    url: `https://api.tfgm.com/odata/Metrolinks?$filter=StationLocation%20eq%20\'${req.query.station}\'`,
    headers: {
      "Ocp-Apim-Subscription-Key": MY_KEY,
    },
  })
    .then((payload) => res.status(200).json(payload.data.value))
    .catch((err) => res.status(500).json(err))
);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
  const user = req.body.user;
  const favourite = req.body.favourite;

  const formData = new User({
    user: user,
    favourite: favourite,
  });
  try {
    await formData.save();
    res.send("saved to favourites!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
