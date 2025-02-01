const category = require("../model/categoryModel");
const Blog = require("../model/blogModel");
const commentModel = require("../model/commentModel");
const userModel = require("../model/userModel")

module.exports.homePage = async (req, res) => {
  try {
    let blogData;
    let categoryData = await category.find({ status: true });
    if (req.query.catID) {
      blogData = await Blog.find({ status: true, categoryID: req.query.catID });
    } else {
      blogData = await Blog.find({ status: true });
    }

    return res.render("userSide/homePage", {
      categoryData,
      blogData,
    });
  } catch (error) {
    console.error("Error while rendering home page:", error);
    return res.redirect("back");
  }
};

module.exports.readMore = async (req, res) => {
  try {
    let postID = req.params.id;
    let categoriesData = await category.find({ status: true });
    let blogsData = await Blog.findById(req.params.id);
    let viewComments = await commentModel.find({postID:req.params.id});
    console.log(viewComments);
    return res.render("userSide/readMore", {
      categoriesData,
      blogsData,
      postID,
      viewComments
    });
  } catch (error) {
    console.error("Error while rendering readmore page:", error);
    return res.redirect("back");
  }
};

module.exports.addComments = async (req, res) => {
  try {
    let commentData = await commentModel.create(req.body);
    if (commentData) {
      let blogData = await Blog.findById(req.body.postID);
      blogData.commentID.push(commentData._id);
      await Blog.findByIdAndUpdate(req.body.postID, blogData);
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error while adding comments :", error);
    return res.redirect("back");
  }
};

module.exports.UserRegisterInfo = async (req, res) => {
  try {
    let userData = await userModel.create(req.body)
    if (userData) {
      console.log("user register successfully");
      return res.redirect("back");
    } else {
      console.log("Error while register usre");
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error while adding user registration informations :", error);
    return res.redirect("back");
  }
}