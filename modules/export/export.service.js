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

export const saveCannedFolder = async (response) => {
  // first i save the root message and folder
  console.log(response);
  for (let i in response.items) {
    const rootMessage = new Message({
      _id: new mongoose.Types.ObjectId(),
      id: response.items[i].id,
      name: response.items[i].name,
      folderId: response.items[i].folderId,
      updated: response.items[i].updated,
      frontendFolderId: response.items[i].frontendFolderId,
      text: response.items[i].text,
      keywords: response.items[i].keywords,
      subject: response.items[i].subject,
      slashCommand: response.items[i].slashCommand,
      language: response.items[i].language,
      setupItemId: response.items[i].setupItemId,
    });

    await rootMessage.save();

    const rootFolder = new Folder({
      _id: new mongoose.Types.ObjectId(),
      id: response.id,
      name: response.name,
      parentId: response.parentId,
      folderType: response.folderType,
      folders: response._id,
      items: rootMessage._id,
    });

    await rootFolder.save();
  }
  // here i save the children
  for (let i in response.folders) {
    if (!!response.folders[i]) {
      const currentFolder = response.folders[i];
      const currentMessage = response.folders[i].items;
      const newMessage = new Message({
        _id: new mongoose.Types.ObjectId(),
        id: currentMessage.id,
        name: currentMessage.name,
        folderId: currentMessage.folderId,
        updated: currentMessage.updated,
        frontendFolderId: currentMessage.frontendFolderId,
        text: currentMessage.text,
        keywords: currentMessage.keywords,
        subject: currentMessage.subject,
        slashCommand: currentMessage.slashCommand,
        language: currentMessage.language,
        setupItemId: currentMessage.setupItemId,
      });

      await newMessage.save();

      const newFolder = new Folder({
        _id: new mongoose.Types.ObjectId(),
        id: currentFolder.id,
        name: currentFolder.name,
        parentId: currentFolder.parentId,
        folderType: currentFolder.folderType,
        folders: currentFolder._id,
        items: newMessage._id,
      });
      await newFolder.save();

      saveCannedFolder(response.folders[i]);
    } else {
      console.log(response.folders[i]);
    }
  }
};
