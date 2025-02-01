const express = require("express");
const routes = express.Router();
const blogCtl = require("../controller/blogCtl");
const blogModel = require("../model/blogModel");

routes.get("/", blogCtl.blogHome);

routes.post("/insertBlogData", blogModel.uploadAdminImage ,blogCtl.insertBlogData);

routes.get("/viewBlogData", blogCtl.viewBlogData);

routes.get("/deleteBlog/:id", blogCtl.deleteBlog)

module.exports = routes; 