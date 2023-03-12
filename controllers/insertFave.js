const User = require("../Models/dataSchema.js");

const insertFave = async (req, res) => {
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
};

module.exports = insertFave;
