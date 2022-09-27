import mongoose from "mongoose";

const folderModel = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  parentId: {
    type: Number,
  },
  folderType: {
    type: String,
  },
  folders: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    },
  ],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

//folderModel.add({ folders: [folderModel] });

export const Folder = mongoose.model("Folder", folderModel);
