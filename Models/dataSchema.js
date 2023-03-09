const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  favourite: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", ReactFormDataSchema);
module.exports = User;
