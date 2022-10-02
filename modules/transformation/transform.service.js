import * as fs from "fs";
import { mockObject } from "../../helpers/mockResponse.js";

export const readAllSavedMessages = () => {
  fs.readFile("file.json", "utf-8", (err, jsonString) => {
    if (err) console.log("Error reading file: ", err);
    try {
      const convertedResponse = JSON.parse(jsonString);
      joinFolders(convertedResponse);
      return convertedResponse;
    } catch (err) {
      console.log("Error parsing JSON string: ", err);
    }
  });
};

//recursive generator function that yields array paths of name attributes
let flattenFolders = function* ({ name = "", folders = [], items = [] }) {
  yield [name];
  for (const x of [...folders, ...items]) {
    for (const path of flattenFolders(x)) {
      yield [name, ...path];
    }
  }
};

//connects the paths with /
function joinFolders(data) {
  for (const path of flattenFolders(data)) {
    console.log(path.join("/"));
  }
}
