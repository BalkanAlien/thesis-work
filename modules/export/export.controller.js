import { findAll } from "./export.service.js";

export const getAllCannedMessages = async (req, res) => {
    const accountId = req.query.accountId;
    const apiKey = req.query.apiKey;
    const response = await findAll(accountId, apiKey);
    console.log('messages', response.data);
    res.send(response.data);
};
