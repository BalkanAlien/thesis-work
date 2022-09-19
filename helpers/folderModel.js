import mongoose from "mongoose";

const folderModel = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  parentId: {
    type: null,
  },
  folderType: {
    type: String,
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subfolder" }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Folder", folderModel);
