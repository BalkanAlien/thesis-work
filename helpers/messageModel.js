import mongoose from "mongoose";

const messageModel = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  updated: {
    type: Date,
  },
  frontendFolderId: {
    type: Number,
  },
  text: {
    type: String,
  },
  keywords: {
    type: String,
  },
  subject: {
    type: String,
  },
  slashCommand: {
    type: String,
  },
  language: {
    type: String,
  },
  setupItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
});

module.exports = mongoose.model("Message", messageModel);
