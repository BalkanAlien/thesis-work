import mongoose from "mongoose";

const subfolderModel = mongoose.Schema({
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
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subfolder" }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Subfolder", subfolderModel);
