const express = require("express");
const app = express();
const dbRoutes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require('cors');
mongoose.connect(process.env.MONGODB_URI);

var session = require("express-session");

app.use(cors());
app.use(express.static("public"));
app.use(
    session({
        secret: "cats"
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/db", dbRoutes);

app.listen(4000, () => {
    console.log("Listen on port 4000");
});
