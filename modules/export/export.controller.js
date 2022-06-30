import { findAll } from "./export.service.js";

export const getAllCannedMessages = async (req, res, next) => {

    const accountId = req.query.accountId;
    const apiKey = req.query.apiKey;

    if (!accountId || !apiKey) {
        res.status(400).send("Missing an accountId OR an API key.");
    }
    //check if accountId does NOT contain only numbers
    else if (!(/^\d+$/.test(accountId))) {
        res.status(400).send("The accountId should contain only numbers!");
    }
    try {
        const response = await findAll(accountId, apiKey);
        console.log('messages', response.data);
        res.send(response.data);
    }
    catch (error) {
        res.status(500).send("Error found!");
    }
};
