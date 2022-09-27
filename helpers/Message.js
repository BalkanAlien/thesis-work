import mongoose from "mongoose";

const messageModel = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  folderId: {
    type: mongoose.Schema.Types.String,
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
    type: String,
  },
});

export const Message = mongoose.model("Message", messageModel);
