import mongoose from "mongoose";
const { Schema } = mongoose;

const cannedMessageModel = new Schema({
  json: Object,
});

export const CannedMessages = mongoose.model(
  "CannedMessages",
  cannedMessageModel
);
