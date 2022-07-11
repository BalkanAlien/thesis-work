import { findAll } from "./export.service.js";

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
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error 500" });
    }
  }
};
