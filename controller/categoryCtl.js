const category = require("../model/categoryModel");
const { validationResult } = require("express-validator");

module.exports.categoryPage = async (req, res) => {
    try {
        await res.render("category/addCategory", {
            errorsData: [],
            oldData: []
        });
    } catch (error) {
        console.error("Error while rendering category page:", error);
        return res.redirect("back");
    }
};

module.exports.insertCategoryData = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.render("category/addCategory", {
                errorsData: errors.mapped(),
                oldData: req.body
            })
        } else {
            let addCategory = await category.create(req.body);
            if (addCategory) {
                req.flash('success', "category added successfully")
                return res.redirect("back");
            } else {
                console.log("Something went wrong");
                return res.redirect("back");
            }
        }
    } catch (error) {
        console.error("Error while inserting category data:", error);
        return res.redirect("back");
    }
};

module.exports.categoryData = async (req, res) => {
    try {
        let categoryData = await category.find();
        res.render("category/categoryData", {
            categoryData
        });
    } catch (error) {
        console.error("Error while fetching category data:", error);
        return res.redirect("back");
    }
};

module.exports.deleteCategory = async (req, res) => {

    try {
        await category.findByIdAndDelete(req.query.catID);
        req.flash('success', "category deleted successfully");
        return res.redirect('back');
    } catch (error) {
        console.error("Error while deleting category data:", error);
        return res.redirect("back");
    }

};

module.exports.updateCategory = async (req, res) => {
    let id = req.params.id;
    let singleCategory = await category.findById(id);

    if (singleCategory) {
        return res.render("category/updatecategory", {
            singleCategory
        });
    } else {
        console.log("Category not found");
    }
};

module.exports.editcat = async (req, res) => {
    var singleCategory = await category.findById(req.body.id);

    req.body.categoryName = req.body.categoryName || singleCategory.categoryName;

    await category.findByIdAndUpdate(req.body.id, req.body);

    req.flash('success', "category updated successfully")
    return res.redirect("/category/categoryData");
};

module.exports.deleteCat = async (req, res) => {
    try {
        console.log(req.body.Ids);
        let multipleCategoryDelete = await category.deleteMany({ _id: { $in: req.body.Ids } });
        if (multipleCategoryDelete) {
            return res.redirect("back");
        } else {
            console.error("Something went wrong !");
            return res.redirect("back");
        }
    } catch (error) {
        console.error("Error while deleting multiple categories:", error);
        return res.redirect("back");
    }
};

module.exports.changeStatus = async (req, res) => {
    try {
        console.log(req.query);
        let catStatusUpdate = await category.findByIdAndUpdate(req.query.catId, { status: req.query.status });
        if (catStatusUpdate) {
            return res.redirect("back");
        } else {
            console.error("Something went wrong !");
            return res.redirect("back");
        }
    } catch (error) {
        console.error("Error while changing the category status:", error);
        return res.redirect("back");
    }
};
