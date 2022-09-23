import axios from "axios";
import mongoose from "mongoose";
import { Folder } from "../../helpers/Folder.js";
import { Message } from "../../helpers/Message.js";

export const findAll = async (accountId, apiKey) => {
  const result = await axios.get(
    `${process.env.BASE_URL}/aid/${accountId}/v1/setup/folders/chatCannedMessages`,
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );

  return result.data;
};

export const saveCannedMessage = async (cannedMessage) => {
  /*const transformedMessage = {
    ...cannedMessage,
    id: 1,
    setupItemId: +cannedMessage.setupItemId,
  };
  console.log(transformedMessage);*/
  const message = new Message(cannedMessage);

  return await message.save();
};

export const saveCannedFolder = async (cannedFolder) => {
  const folder = new Folder(cannedFolder);

  return await folder.save();
};
