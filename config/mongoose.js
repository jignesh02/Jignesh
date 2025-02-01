const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jigneshb0208:jFtLyPjg8H2PUpxC@cluster.pgutj.mongodb.net/BackendAdmin",)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// const db = mongoose.connection;
// db.once("open", (err) => {
//     err ? console.log(err) : console.log("Database connected successfully...");
// });
// module.exports = db;