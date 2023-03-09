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

  try {
    const userData = await User.find({
      user: email,
    });
    if (userData.length === 0) {
      const formData = new User({
        user: email,
        favourite: favourite,
      });
      await formData.save();
      res.sendStatus(201);
    } else {
      await User.findOneAndUpdate(
        {
          user: email,
        },
        {
          favourite: favourite,
        }
      );
      res.sendStatus(201);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.get("/fetch/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const userData = await User.find({
      user: email,
    });
    if (userData.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send({
        userData,
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = app;
