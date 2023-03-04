const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

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
module.exports = app;
