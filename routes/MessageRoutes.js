const router = require("express").Router();
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Cryptr = require("cryptr");
require("dotenv").config();

//TODO: use dotenv to hide key
cryptr = new Cryptr(process.env.CRYPTR_KEY);

//Home page
router.get("/", (req, res) => {
  //Send welcome message
  res.send("Welcome to the messages web service");
});

//Retrieving a message
router.get("/messages/:messageId", async (req, res) => {
  try {
    //try to find message
    let message = await Message.findOne({
      _id: req.params.messageId,
    });
    //check if message is found
    if (message) {
      //decrypt message
      let decryptedString = cryptr.decrypt(message.message);
      //send message
      res.send(decryptedString);
    } else {
      //throw error if message not found
      throw new Error("Nothing found");
    }
  } catch (e) {
    //check for know errors and respond
    if (e.kind == "ObjectId" || e.message == "Nothing found") {
      res.send("Please check ID");
    } else {
      //log unknown errors
      console.log(e);
      //send general error message
      res.send("Failed to get message. Please check request");
    }
  }
});

//Posting a message
router.post("/messages/", (req, res) => {
  //getting user input
  let message = Object.keys(req.body)[0];

  //encrypting message
  let encryptedMessage = cryptr.encrypt(message);

  //creating new message
  const newMessage = new Message({ message: encryptedMessage });

  //saving new message
  newMessage
    .save()
    .then(() => {
      //send message Id
      res.send({ id: newMessage._id });
    })
    .catch((err) => {
      //log unknown error
      console.log(err);
      //send general error message
      res.send("Something has gone wrong. Please check request");
    });
});

//module export

module.exports = router;
