const Blog = require("../model/blogModel");
const category = require("../model/categoryModel");


module.exports.blogHome = async (req, res) => {
  try {
    let categoryData = await category.find();
    await res.render("blog/addBlog", {
      categoryData,
    });
  } catch (error) {
    console.error("Error while rendering category page:", error);
    return res.redirect("back");
  }
};

module.exports.insertBlogData = async (req, res) => {
  try {
    let image = "";
    if (req.file) {
      image = (await Blog.pathOfImage) + "/" + req.file.filename;
    }
    req.body.image = image;
    console.log(req.body)
    let addBlogData = await Blog.create(req.body);
    if (addBlogData) {
      let findCategory = await category.findById(req.body.categoryID);
      findCategory.blogId.push(addBlogData._id);
      await category.findByIdAndUpdate(req.body.categoryID, findCategory);

      req.flash("success", "Blog added successfully");
      return res.redirect("viewblogData");

    } else {
      console.log("Something went wrong");
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error while inserting blog data:", error);
    return res.redirect("back");
  }
};

module.exports.viewBlogData = async (req, res) => {
  try {
    let viewBlogData = await Blog.find().populate("categoryID").exec();
    res.render("blog/viewBlog", {
      viewBlogData,
    });
  } catch (error) {
    console.error("Error while fetching blog data:", error);
    return res.redirect("back");
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash("success", "Blog deleted successfully");
    return res.redirect("back");
  } catch (error) {
    console.error("Error while deleting blog data:", error);
    return res.redirect("back");
  }
};
