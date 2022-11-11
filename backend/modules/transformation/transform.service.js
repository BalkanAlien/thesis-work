import * as fs from "fs";
import { mockObject } from "../../helpers/mockResponse.js";

export const readAllSavedMessages = () => {
  fs.readFile("file.json", "utf-8", (err, jsonString) => {
    if (err) console.log("Error reading file: ", err);
    try {
      const convertedResponse = JSON.parse(jsonString);
      //console.log(createSimplifiedResponse(convertedResponse));
      //console.log(createLibraries(convertedResponse));
      //joinText(convertedResponse);
      //console.log("text" + createTexts(mockObject));
      //console.log(storeSubstitutions(convertedResponse));
      //console.log(traverse(mockObject, ""));
      //console.log(joinText(mockObject));
      //console.log(joinItemIds(convertedResponse));
      console.log(joinFolderIds(mockObject));
      //console.log(joinItemIds(convertedResponse));
      return convertedResponse;
    } catch (err) {
      console.log("Error parsing JSON string: ", err);
    }
  });
};

//recursive generator function that yields array paths of name attributes
function* flattenFolders({ name = "", folders = [], items = [] }) {
  yield [name];
  for (const x of [...folders, ...items]) {
    for (const path of flattenFolders(x)) {
      yield [name, ...path];
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

//connects the subfolders paths with /
function joinFolders(data) {
  let arr = [];
  for (const path of flattenFolders(data)) {
    arr.push(path.join("/"));
  }
  arr.shift();
  return arr;
}

//recursive generator functions that yields paths of node objects
function* flat(t = {}) {
  yield [t];
  for (const x of [...(t.folders ?? []), ...(t.items ?? [])])
    for (const path of flat(x)) yield [t, ...path];
}

function joinFoldersAndIds(data) {
  let arr = [];
  for (const path of flat(data))
    arr.push(path.map((node) => `${node.name ?? " "}${node.id}`).join(" "));
  arr.shift();
  return arr;
}

function* flattenText({ folders = [], items = [], text = "" }) {
  yield [text];
  for (const x of [...folders, ...items]) {
    for (const path of flattenText(x)) {
      yield [text, ...path];
    }
  }
}

function* flattenFolderIds({ folders = [], items = [], folderId = " " }) {
  yield [folderId];
  for (const x of [...folders, ...items]) {
    for (const path of flattenFolderIds(x)) {
      yield [folderId, ...path];
    }
  }
}

let ids = [];
function getItemIds(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemIds(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      ids.push(obj.id);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemIds(value, key);
      }
    }
  }
  return ids;
}

let names = [];
function getItemNames(obj, parent) {
  if (obj === null) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      getItemNames(item, parent);
    }
  } else if (typeof obj === "object") {
    if (parent === "items") {
      names.push(obj.name);
    } else {
      for (const [key, value] of Object.entries(obj)) {
        getItemNames(value, key);
      }
    }
  }
  return names;
}

function joinFolderIds(data) {
  let arr = [...flattenFolderIds(data)];
  arr = arr.flat();
  arr = arr.filter((e) => String(e).trim()); //removing whitespaces
  return arr;
}

//returns an array of texts in the canned message
function joinText(data) {
  let arrOfText = [...flattenText(data)];
  arrOfText = arrOfText.flat();
  arrOfText = arrOfText.filter((e) => String(e).trim());
  console.log(arrOfText);
  return arrOfText;
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

export const createLibraries = (data) => {
  let libraries = [];
  // here i create an array of subfolder names
  const arrOfSubfolderNames = joinFolders(data);
  const arrOfSubfoldersNamesAndIds = joinFoldersAndIds(data);

  //an array of subfolders ids
  for (let i = 0; i < arrOfSubfoldersNamesAndIds.length; i++) {
    arrOfSubfoldersNamesAndIds[i] = arrOfSubfoldersNamesAndIds[i].substring(
      arrOfSubfoldersNamesAndIds[i].length - 16
    );
  }
  //remove first / char
  for (let i = 0; i < arrOfSubfolderNames.length; i++) {
    arrOfSubfolderNames[i] = arrOfSubfolderNames[i].slice(1);
  }

  for (let i = 0; i < arrOfSubfolderNames.length; i++) {
    let arrObject = {
      id: arrOfSubfoldersNamesAndIds[i],
      name: arrOfSubfolderNames[i],
      isLibrary: true,
      //selfUri: "",
    };
    libraries.push(arrObject);
  }
  let responses = createSimplifiedResponse(data);
  libraries = libraries.filter(
    (lib) => !responses.find((re) => re.id === lib.id)
  );
  let counts = [];
  for (let i = 0; i < libraries.length; i++) {
    let cnt = 0;
    for (let j = 0; j < responses.length; j++) {
      if (libraries[i].id == responses[j].library) {
        cnt++;
      }
    }
    counts.push(cnt);
  }
  for (let i = 0; i < libraries.length; i++) {
    libraries[i].totalMessages = counts[i];
  }
  return libraries;
};

//creating texts
const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
export const createTexts = (data) => {
  let texts = [];
  const arrOfTexts = joinText(data);
  for (let i = 0; i < arrOfTexts.length; i++) {
    let temp = "";
    if (isHTML(arrOfTexts[i])) temp = "text/html";
    else temp = "text/plain";
    let textObject = {
      content: arrOfTexts[i],
      contentType: temp,
    };
    texts.push(textObject);
  }
  return texts;
};

export const createSimplifiedResponse = (data) => {
  let simplifiedItems = [];
  const arrOfText = joinText(data);
  let arrOfItemIds = getItemIds(data);
  let arrOfFolderIds = joinFolderIds(data);
  let arrOfNames = getItemNames(data);
  for (let i = 0; i < arrOfText.length; i++) {
    let simpleResponse = {
      id: arrOfItemIds[i],
      name: arrOfNames[i],
      text: arrOfText[i],
      library: arrOfFolderIds[i],
      isLibrary: false,
    };
    simplifiedItems.push(simpleResponse);
  }
  for (let i = 0; i < simplifiedItems.length; i++) {
    if (simplifiedItems[i].library == null) {
      simplifiedItems[i].library = "";
    }
  }
  const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
  for (let i = 0; i < simplifiedItems.length; i++) {
    if (isHTML(simplifiedItems[i].text)) {
      simplifiedItems[i].text = simplifiedItems[i].text.replace(
        /<[^>]*>?/gm,
        ""
      );
    }
    if (/\r|\n/.exec(simplifiedItems[i].text)) {
      simplifiedItems[i].text = simplifiedItems[i].text.replace(/\n/g, "");
    }
  }
  return simplifiedItems;
};

export const mergeLibrariesAndResponses = (data) => {
  let merged = createLibraries(data).concat(createSimplifiedResponse(data));
  return merged;
};
