const express = require("express");
const User = require("./models").User;
const Document = require("./models").Document;

module.exports = bigFunction = (passport) => {
    const router = express.Router();

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

    const LocalStrategy = require("passport-local").Strategy;

    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password"
            },
            function (username, password, done) {
                // console.log("yolo");
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

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('deserialize');
        User.findById(id, function (err, user) {
            console.log(user);
            done(err, user);
        });
    });

    router.post("/login", passport.authenticate("local"), function (req, res) {
        res.send(req.user);
    });

    router.get("/logout", function (req, res) {
        req.logout();
        res.send("logout");
    });

    router.get("/userDocuments", function (req, res) {
        //console.log("The user is:", req.user);
        let docIDArr = req.user.collaboratorOn;
        let docArr = [];
        let count = 0;

        Document.find({ collaborators: req.user._id }).exec()
            .then(documents => {
                console.log('docs', documents);
                res.send(
                    { docArr: documents });
            })
            .catch(err => {
                console.log('err', err)

            })

    });

    router.post("/createDocument", function (req, res) {
        console.log(req.body);
        let newDoc = new Document({
            title: req.body.docName,

            author: req.user._id,
            collaborators: [req.user._id]
        });
        newDoc.save().then(resp => {
            console.log(resp);
            User.findByIdAndUpdate(req.user._id,
                { $addToSet: { collaboratorOn: resp._id } }).exec(err => {
                    if (err) {
                        console.log(err)
                        res.send(err);

                    }
                    else {
                        res.send(resp);

                    }

                })

        }).catch(err => {
            console.log(err);
        })
    });

    return router;
}
