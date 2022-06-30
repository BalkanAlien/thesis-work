import axios from "axios";

// API key for 2307475884 2307475884:3232803079762238:vD83XBmsKRGIIy4nEz8EQHO69Acg69kS:alphado1
// API key for 622858923344832311 
export const findAll = (accountId, apiKey) => {
    return axios.get(`${process.env.BASE_URL}/aid/${accountId}/v1/setup/folders/chatCannedMessages`, {
        headers: {
            'X-API-KEY': apiKey
        }
    });
};