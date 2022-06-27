import axios from "axios";

const BASE_URL = "https://admin-backend-alphado1.bold360.io/aid/2307475884/v1/setup/folders/chatCannedMessages";

export const findAll = () => {
    return axios.get(`${BASE_URL}`, {
        headers: {
            'X-API-KEY': '2307475884:3232803079762238:vD83XBmsKRGIIy4nEz8EQHO69Acg69kS:alphado1'
        }
    });
};