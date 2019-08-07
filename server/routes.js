const express = require("express");
const router = express.Router();
const User = require("./models").User;
const Document = require("./models").Document;

const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

router.post("/register", (req, res) => {
    //create new user and save
    console.log(req.body);
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user
        .save()
        .then(response => {
            console.log(response);
            res.send(response);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    //console.log("user out here");
    User.findById(id, function (err, user) {
        //console.log("yea", user);
        done(err, user);
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password"
        },
        function (username, password, done) {
            //console.log("yolo");
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    console.log("no user");
                    return done(null, false, { message: "Incorrect username." });
                }
                if (password !== user.password) {
                    console.log("bad password");
                    return done(null, false, { message: "Incorrect password." });
                }
                return done(null, user);
            });
        }
    )
);

router.post("/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
});

router.get("/logout", function (req, res) {
    req.logout();
    res.send("logout");
});

// router.get("/userDocuments", function (req, res) {
//     let docIDArr = req.user.collaboratorOn;
//     let docArr = [];
//     let count = 0;

//     docIDArr.forEach(docID => {
//         console.log(docID);
//         count += 1;

//         Document.findById(docID).exec(function (err, data) {
//             if (!err) {
//                 docArr.push(data);
//             } else {
//                 console.log(err);
//             }
//         });
//         if (count === docIDArr.length) {
//             res.send(docArr);
//         }
//     });
// });

router.post("/createDocument", function (req, res) {
    let newDoc = new Document({
        title: req.body.docName,

        author: req.user._id,
        collaborators: [req.user._id]
    });
    newDoc.save().exec(function (err) {
        if (!err) {
            console.log("saved");
            res.send("saved");
        } else {
            console.log(err);
            res.send("error");
        }
    });
});

module.exports = router;
