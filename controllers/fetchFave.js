const User = require("../Models/dataSchema.js");

const fetchFave = async (req, res) => {
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
};

module.exports = fetchFave;
