const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userConfirmPass: { type: String, required: true },
}, { timestamps: true });

const user = mongoose.model("user", userSchema);

module.exports = user;