const express = require("express");
const routes = express.Router();
const userSideCtl = require("../controller/userSideCtl");

routes.get("/", userSideCtl.homePage);

routes.get("/userRegister", async (req, res) => {
    return res.render("userSide/UserRegister")
});

routes.get("/userLogin", async (req, res) => {
    return res.render("userSide/UserLogin")
});

routes.post("/UserRegisterInfo", userSideCtl.UserRegisterInfo)

routes.get("/readMore/:id", userSideCtl.readMore);

routes.post("/addComments", userSideCtl.addComments)
module.exports = routes; 