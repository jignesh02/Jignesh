const mongoose = require("mongoose");

const path = require("path");
const multer = require("multer");
const imagePath = "/upload/blog"

const blogSchema = mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    blogTitle: { type: String, required: true },
    image: { type: String, required: true },
    blogDescription: { type: String, required: true },
    status: { type: Boolean, default: true },
    commentID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
}, { timestamps: true });

const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imagePath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

blogSchema.statics.uploadAdminImage = multer({ storage: storeImage }).single("image");
blogSchema.statics.pathOfImage = imagePath;


const blog = mongoose.model("blog", blogSchema);

module.exports = blog;