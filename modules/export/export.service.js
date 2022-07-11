import axios from "axios";

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
