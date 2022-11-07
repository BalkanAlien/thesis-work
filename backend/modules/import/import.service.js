import { findAll } from "../export/export.service.js";
import {
  createLibraries,
  createTexts,
  createSimplifiedResponse,
  mergeLibrariesAndResponses,
} from "../transformation/transform.service.js";

export const getAllTransformedCannedMessages = async (req, res) => {
  const accountId = req.query.accountId;
  const apiKey = req.query.apiKey;
  try {
    const response = await findAll(accountId, apiKey);
    const libraries = createLibraries(response);
    const texts = createTexts(response);
    const resp = createSimplifiedResponse(response);
    console.log("MERGED:");
    console.log(mergeLibrariesAndResponses(response));
    //console.log(libraries);
    //console.log(texts);
    return mergeLibrariesAndResponses(response);
  } catch (error) {
    console.log(error);
  }
};
