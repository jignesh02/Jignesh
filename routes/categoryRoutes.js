const express = require("express");
const routes = express.Router();
const categoryCtl = require("../controller/categoryCtl");
const { check } = require("express-validator");

routes.get("/", categoryCtl.categoryPage);

routes.post("/insertCategoryData",
    [
        check("categoryName")
            .notEmpty()
            .withMessage("Category name is required")
            .isLength({ min: 2 })
            .withMessage("Minimum 2 charcter required"),
    ]
    , categoryCtl.insertCategoryData);

routes.get("/categoryData", categoryCtl.categoryData);

routes.get("/deleteCategory", categoryCtl.deleteCategory);

routes.get('/updateCategory/:id', categoryCtl.updateCategory);

routes.post('/editcat', categoryCtl.editcat);

routes.post("/deleteMultipleCategory", categoryCtl.deleteCat);

routes.get("/changeStatus", categoryCtl.changeStatus);

module.exports = routes; 