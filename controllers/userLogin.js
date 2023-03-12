// Makes a call to the Google api to login a user
const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

const userLogin = async (req, res) => {
  const token = req.params.token;
  try {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((payload) => {
        const webToken = jwt.sign(token, jwtSecret);
        const info = payload.data;
        res
          .status(200)
          .cookie("userToken", webToken, { maxAge: 1000 * 60 * 60 * 24 })
          .send({ info, webToken });
      });
  } catch {
    res.sendStatus(500);
  }
};

module.exports = userLogin;
