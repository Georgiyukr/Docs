const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authorOf: {
    type: mongoose.Schema.ObjectId,
    ref: "Document"
  },
  collaboratorOn: {
    type: Array
  }
});

const documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  password: {
    type: String,
    required: false
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  collaborators: {
    type: Array
  }
});
const User = mongoose.model("User", userSchema);
const Document = mongoose.model("Document", documentSchema);

module.exports = {
  User,
  Document
};
