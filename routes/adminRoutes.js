const express = require("express");
const routes = express.Router();
const adminCtl = require("../controller/adminCtl");
const admin = require("../model/adminModel");
const { check } = require("express-validator");

routes.get("/admin", adminCtl.adminPage);

routes.get("/addAdmin", adminCtl.adminForm);

routes.get("/adminData", adminCtl.adminData);

routes.post(
  "/insertFormData",
  admin.uploadAdminImage,
  [
    check("fname")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("Minimum 2 charcter required"),
    check("lname")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Minimum 2 charcter required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter valid email")
      .custom(async (value) => {
        let checkEmail = await admin.find({ email: value }).countDocuments();
        if (checkEmail > 0) {
          throw new Error("Admin emial is allready exist");
        }
      }),
    check("password", "...")
      .notEmpty()
      .withMessage("Passwors is required")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
      .withMessage(
        "Atleast 1 uppercase, 1 lowercase, 1 number and passwors should be greater than 8 charcter"
      ),
    check("gender").notEmpty().withMessage("Select gender"),
    check("city").notEmpty().withMessage("Select city"),
    check("hobby").notEmpty().withMessage("Select hobby"),
    check("message").notEmpty().withMessage("Write message"),
  ],
  adminCtl.insertFormData
);

routes.use("/category", require("./categoryRoutes"));

routes.use("/blog", require("./blogRoutes"));

routes.use("/", require("./userSideRoutes"));

module.exports = routes;
