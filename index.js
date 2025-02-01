const express = require("express");
const port = 8008;
const app = express();

const path = require("path");
const db = require("./config/mongoose");
const session = require("express-session");
const flash = require("connect-flash")
const flashMessage = require("./config/flashMessage");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded())
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(session({
    name: 'jignesh',
    secret: 'thisissecrate',
    resave: false,
    saveUninitialized: false,
    cookie:{
        MaxAge: 100*60*60
    }
}));
app.use(flash());
app.use(flashMessage.setFlash)

app.use("/",require("./routes/adminRoutes"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server started at http://localhost:${port}`);
});