const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    postID: { type: mongoose.Schema.Types.ObjectId, ref: 'blog' },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userImage: { type: String, required: true },
    comments: { type: String, required: true },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    Dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    status: { type: Boolean, default: true },
}, { timestamps: true });

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;