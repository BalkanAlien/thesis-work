import * as fs from "fs";
import { mockObject } from "../../helpers/mockResponse.js";

export const readAllSavedMessages = () => {
  fs.readFile("file.json", "utf-8", (err, jsonString) => {
    if (err) console.log("Error reading file: ", err);
    try {
      const convertedResponse = JSON.parse(jsonString);
      //console.log(createLibraries(convertedResponse));
      //joinText(mockObject);
      console.log(createTexts(mockObject));
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

//returns an array of texts in the canned message
function joinText(data) {
  let arrOfText = [...flattenText(data)];
  arrOfText = arrOfText.flat();
  arrOfText = arrOfText.filter((e) => String(e).trim());
  console.log(arrOfText);
  return arrOfText;
}

//libraries consist of id, name, selfUri(idk what is this)
function createLibraries(data) {
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
  for (let i = 0; i < arrOfSubfolderNames.length; i++) {
    let arrObject = {
      id: arrOfSubfoldersNamesAndIds[i],
      name: arrOfSubfolderNames[i],
      selfUri: "",
    };
    libraries.push(arrObject);
  }
  return libraries;
}

//creating texts
const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
function createTexts(data) {
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
}
