const mongoose = require("mongoose");

//Message Schema
const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

//module export
module.exports = new mongoose.model("Message", MessageSchema);
