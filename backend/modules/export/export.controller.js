import { findAll } from "./export.service.js";
import * as fs from "fs";
import { readAllSavedMessages } from "../transformation/transform.service.js";
import { mockObject } from "../../helpers/mockResponse.js";
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
      const ArrayOfNames = joinNames(response);
      const result = await res.send(ArrayOfNames); //sending the data to my frontend
      console.log(ArrayOfNames);
      return ArrayOfNames;
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error 500" });
    }
  }
};

function* flattenNames({ name = "", folders = [], items = [] }) {
  yield [name];
  for (const x of [...folders, ...items]) {
    for (const path of flattenNames(x)) {
      yield [name, ...path];
    }
  }
}

function joinNames(data) {
  let arr = [];
  for (const path of flattenNames(data)) {
    arr.push(path.join("/"));
  }
  arr.shift();
  let newArr = [];
  for (const str of arr) {
    const newStr = str.split("/").pop();
    newArr.push(newStr);
  }
  return newArr;
}
