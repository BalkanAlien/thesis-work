import { findAll } from "./export.service.js";

export const getAllCannedMessages = async (req, res) => {

    const response = await findAll();
    console.log('messages', response.data);
    res.send(response.data);
};
