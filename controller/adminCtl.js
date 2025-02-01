const admin = require("../model/adminModel");
const category = require("../model/categoryModel")
const Blog = require("../model/blogModel");
const { validationResult } = require("express-validator");

module.exports.adminPage = async (req, res) => {
    try {
        let catData = await category.find(req.body);
        let blogData = await Blog.find(req.body);

        let blogDataArray = [];
        let catDataArray = [];

        catData.map((v, i) => {
            catDataArray.push(v.categoryName);
            blogDataArray.push(v.blogId.length)
        });

        let newBlogData = Blog.length;

        res.render("admin/adminDash", {
            catDataArray, blogDataArray, newBlogData
        });

    } catch (error) {
        console.error("Error rendering admin page:", error);
        return res.redirect("back");
    }
};

module.exports.adminForm = (req, res) => {
    try {
        res.render("admin/addAdmin", {
            errorsData: [],
            oldData: []
        });
    } catch (error) {
        console.error("Error rendering admin form:", error);
        return res.redirect("back");
    }
};

module.exports.insertFormData = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.render("admin/addAdmin", {
                errorsData: errors.mapped(),
                oldData: req.body
            })
        } else {
            let image = "";
            if (req.file) {
                image = await admin.pathOfImage + "/" + req.file.filename;
            }
            req.body.image = image;
            req.body.name = req.body.fname + " " + req.body.lname;

            let addAdmin = await admin.create(req.body);
            if (addAdmin) {
                console.log("Admin data added successfully...");
                return res.redirect("back");
            } else {
                console.log("Something went wrong");
                return res.redirect("back");
            }
        }
    } catch (error) {
        console.error("Error inserting admin data:", error);
        return res.redirect("back");
    }
};

module.exports.adminData = async (req, res) => {
    try {
        let adminData = await admin.find();
        console.log(adminData);
        res.render("admin/adminData", {
            adminData,
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return res.redirect("back");
    }
};
