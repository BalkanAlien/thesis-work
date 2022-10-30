import { findAll } from "./export.service.js";
import * as fs from "fs";
import { readAllSavedMessages } from "../transformation/transform.service.js";

const regexContainsNumbersOnly = /^\d+$/;

export const getAllCannedMessages = async (req, res) => {
  const accountId = req.query.accountId;
  const apiKey = req.query.apiKey;

  if (!accountId || !apiKey) {
    res.status(400).send("Missing an accountId OR an API key.");
    console.log("Missing an accountId OR an API key.");
  } else if (!regexContainsNumbersOnly.test(accountId)) {
    res.status(400).send("The accountId should contain only numbers!");
    console.log("The accountId should contain only numbers!");
  } else {
    try {
      const response = await findAll(accountId, apiKey);
      const convertedResponse = JSON.stringify(response);
      fs.writeFile("file.json", convertedResponse, (err) => {
        if (err) throw err;
        console.log("Data has been written successfully");
      });
      //const savedResponse = await saveResponse(response);
      //console.log(savedResponse);
      //const getBack = readAllSavedMessages();
      //console.log(getBack);
      let foldersArray = joinFoldersArray(response);
      let itemsArray = joinItemsArray(response);
      let array = foldersArray.concat(itemsArray);
      console.log(array);
      const result = await res.send(array); //sending the data to my frontend
      //console.log(rootFolders);
      return array;
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error 500" });
    }
  }
};

//we need the messages and folders to show them on the root page
//folders where parentId = null
//messages where folderId = null

function* flat(t = {}) {
  yield [t];
  for (const x of [...(t.folders ?? [])])
    for (const path of flat(x)) yield [t, ...path];
}

function joinFoldersAndMessages(data) {
  let arr = [];
  for (const path of flat(data))
    arr.push(
      path.map((node) => ` ${node.name ?? " "} ${node.parentId}`).join(" ")
    );
}

let itemIds = [];
function getItemIds(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemIds(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      itemIds.push(obj.id);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemIds(value, key);
      }
    }
  }
  return itemIds;
}

let itemNames = [];
function getItemNames(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemNames(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      itemNames.push(obj.name);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemNames(value, key);
      }
    }
  }
}

let itemFolderIds = [];
function getItemFolderIds(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemFolderIds(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      itemFolderIds.push(obj.folderId);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemFolderIds(value, key);
      }
    }
  }
}

let itemTexts = [];
function getItemText(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemText(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      itemTexts.push(obj.text);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemText(value, key);
      }
    }
  }
}

function joinItemsArray(data) {
  let objects = [];
  getItemIds(data);
  getItemFolderIds(data);
  getItemNames(data);
  getItemText(data);
  for (let i = 0; i < itemIds.length; i++) {
    let arrElem = {
      id: itemIds[i],
      itemFolderId: itemFolderIds[i],
      name: itemNames[i],
      text: itemTexts[i],
      isFolder: false,
    };
    objects.push(arrElem);
  }
  return objects;
}

function* flattenNames({ name = "", folders = [] }) {
  yield [name];
  for (const x of [...folders]) {
    for (const path of flattenNames(x)) {
      yield [name, ...path];
    }
  }
}

function getFolderNames(data) {
  let arr = [];
  for (const path of flattenNames(data)) {
    arr.push(path.join(" "));
  }
  let newArr = [];
  for (const str of arr) {
    newArr.push(str.split(" ").pop());
  }
  return newArr;
}

function* flattenIds({ id = "", folders = [] }) {
  yield [id];
  for (const x of [...folders]) {
    for (const path of flattenIds(x)) {
      yield [id, ...path];
    }
  }
}

function getFolderIds(data) {
  let arr = [];
  for (const path of flattenIds(data)) {
    arr.push(path.join(" "));
  }
  let newArr = [];
  for (const str of arr) {
    newArr.push(str.split(" ").pop());
  }
  return newArr;
}

function* flattenParentIds({ parentId = "", folders = [] }) {
  yield [parentId];
  for (const x of [...folders]) {
    for (const path of flattenParentIds(x)) {
      yield [parentId, ...path];
    }
  }
}

function getFolderParentIds(data) {
  let arr = [];
  for (const path of flattenParentIds(data)) {
    arr.push(path.join(" "));
  }
  let newArr = [];
  for (const str of arr) {
    newArr.push(str.split(" ").pop());
  }
  return newArr;
}

function joinFoldersArray(data) {
  let objects = [];
  let folderIds = getFolderIds(data);
  let folderNames = getFolderNames(data);
  let parentIds = getFolderParentIds(data);
  for (let i = 0; i < folderIds.length; i++) {
    let arrElem = {
      id: folderIds[i],
      name: folderNames[i],
      parentId: parentIds[i],
      isFolder: true,
    };
    objects.push(arrElem);
  }
  return objects;
}
