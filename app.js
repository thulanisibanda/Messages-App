const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// port number to listen to
const PORT = process.env.PORT;

//Database config
//TODO: use dotenv to hide name and password
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance!!");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

//middlewares
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require("./routes/MessageRoutes"));

//listening to port
app.listen(PORT, () => {
  console.log("listening to number " + PORT);
});
