import mongoose from "mongoose";

const folderModel = mongoose.Schema({
  id: {
    type: Number,
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
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

export const Folder = mongoose.model("Folder", folderModel);
