import axios from "axios";
import mongoose from "mongoose";
import { CannedMessages } from "../../helpers/jsonSchema.js";

export const findAll = async (accountId, apiKey) => {
  const result = await axios.get(
    `${process.env.BASE_URL}/aid/${accountId}/v1/setup/folders/chatCannedMessages`,
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );

  return result.data;
};

/*
export const saveResponse = async (response) => {
  const savedResponse = new CannedMessages({
    json: response,
  });
  return await savedResponse.save();
};
*/
