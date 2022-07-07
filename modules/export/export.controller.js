import { findAll } from "./export.service.js";

export const getAllCannedMessages = async (req, res) => {
  const accountId = req.query.accountId;
  const apiKey = req.query.apiKey;

  if (!accountId || !apiKey) {
    res.status(400).send("Missing an accountId OR an API key.");
  } else if (!/^\d+$/.test(accountId)) {
    res.status(400).send("The accountId should contain only numbers!");
  }
  try {
    const response = await findAll(accountId, apiKey);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error 500" });
  }
};
