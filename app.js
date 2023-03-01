const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
const MY_KEY = process.env.REACT_APP_API_KEY;

app.get("/", (req, res) =>
  axios({
    method: "get",
    url: "https://api.tfgm.com/odata/Metrolinks",
    headers: {
      "Ocp-Apim-Subscription-Key": MY_KEY,
    },
  })
    .then((res) => console.log(res.data.value[0]["StationLocation"]))
    .catch((err) => console.log(err))
);
console.log(MY_KEY);
module.exports = app;
