const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName: { type: String, required: true },
    status: { type: Boolean, default: true },
    blogId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }]
}, { timestamps: true });

const category = mongoose.model("category", categorySchema);

module.exports = category;