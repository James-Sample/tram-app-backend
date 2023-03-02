const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
const MY_KEY = process.env.REACT_APP_API_KEY;

app.get("/", (req, res) =>
  axios({
    method: "get",
    url: `https://api.tfgm.com/odata/Metrolinks?$filter=StationLocation%20eq%20\'Timperley\'`,
    headers: {
      "Ocp-Apim-Subscription-Key": MY_KEY,
    },
  })
    .then((res) => console.log(res.data.value))
    .catch((err) => console.log(err))
);
module.exports = app;
