const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
mongoose.connect(process.env.MONGODB_URI);

var session = require("express-session");

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

app.use("/db", require('./routes')(passport));

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on("message", function (data) {
    socket.emit("change", data);
  })
});

server.listen(4000, () => {
  console.log("Listen on port 4000");
});
