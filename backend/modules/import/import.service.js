import { findAll } from "../export/export.service.js";
import { mergeLibrariesAndResponses } from "../transformation/transform.service.js";

const regexContainsNumbersOnly = /^\d+$/;

export const getAllTransformedCannedMessages = async (req, res) => {
  const accountId = req.query.accountId;
  const apiKey = req.query.apiKey;

  if (!accountId || !apiKey) {
    res.status(400).send("Missing an accountId OR an API key.");
    console.log("Missing an accountId or an apiKey");
  } else if (!regexContainsNumbersOnly.test(accountId)) {
    res.status(400).send("AccountId should contain only numbers");
    console.log("AccountId should contain only numbers");
  } else {
    try {
      const response = await findAll(accountId, apiKey);
      console.log("MERGED:");
      console.log(mergeLibrariesAndResponses(response));
      const merged = mergeLibrariesAndResponses(response);
      const result = await res.send(merged);
      return merged;
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error 500" });
    }
  }
};
