import axios from "axios";

export const findAll = (accountId, apiKey) => {
  return axios.get(
    `${process.env.BASE_URL}/aid/${accountId}/v1/setup/folders/chatCannedMessages`,
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
};
