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
  const email = req.body.user;
  const favourite = req.body.Favourite;

  //   db.?.updateOne(
  //     { user: email },
  //     { $push: { favourite: favourite } }
  //  )

  const formData = new User({
    user: email,
    favourite: favourite,
  });
  try {
    await formData.save();
    res.send("saved to favourites!");
  } catch (err) {
    console.log(err);
  }
});

app.get("/fetch", async (req, res) => {
  try {
    console.log(res);
    //res.send(data);
  } catch (err) {
    console.log(err);
  }
  //console.log("data");
});

module.exports = app;
