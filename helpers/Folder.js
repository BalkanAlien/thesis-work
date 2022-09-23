import mongoose from "mongoose";

const folderModel = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  folderType: {
    type: String,
    required: true,
  },
  folders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
  ],
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Message", required: true },
  ],
});

export const Folder = mongoose.model("Folder", folderModel);
