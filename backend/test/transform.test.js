import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import { mockObject } from "../helpers/mockResponse.js";
import {
  joinFolders,
  joinFoldersAndIds,
  getItemIds,
  getItemNames,
  joinFolderIds,
  joinText,
  createLibraries,
  createTexts,
  createSimplifiedResponse,
  mergeLibrariesAndResponses,
} from "../modules/transformation/transform.service.js";

chai.use(chaiHttp);
chai.use(assert);

const expect = chai.expect;

describe("transformation tests", () => {
  it("should return an array of joined folder names", () => {
    let arr = [
      "/Testfolder",
      "/Testfolder/Subfolder",
      "/Testfolder/Subfolder/Interesting",
      "/Testfolder/Subfolder/Interesting/Canned Message",
      "/Testfolder/Subfolder/Message in subfolder",
      "/bye",
    ];
    assert.deepEqual(joinFolders(mockObject), arr);
  });

  it("should return an array of joined folders and ids", () => {
    let arr = [
      " 0 Testfolder3195588631115178",
      " 0 Testfolder3195588631115178 Subfolder3195588620182363",
      " 0 Testfolder3195588631115178 Subfolder3195588620182363 Interesting3206824598737435",
      " 0 Testfolder3195588631115178 Subfolder3195588620182363 Interesting3206824598737435 Canned Message3208409930553392",
      " 0 Testfolder3195588631115178 Subfolder3195588620182363 Message in subfolder3195595211854821",
      " 0 bye2888102250465731",
    ];
    assert.deepEqual(joinFoldersAndIds(mockObject), arr);
  });

  it("should return an array of ids of canned messages", () => {
    let arr = ["3208409930553392", "3195595211854821", "2888102250465731"];
    assert.deepEqual(getItemIds(mockObject), arr);
  });

  it("should return an array of names of canned messages", () => {
    let arr = ["Canned Message", "Message in subfolder", "bye"];
    assert.deepEqual(getItemNames(mockObject), arr);
  });

  it("should return an array of joined folder ids", () => {
    let arr = ["3206824598737435", "3195588620182363", null];
    assert.deepEqual(joinFolderIds(mockObject), arr);
  });

  it("should return an array of texts of canned messages", () => {
    let arr = [
      "<p>This is an HTML with Image.</p>\n" +
        '<p><img src="https://play-lh.googleusercontent.com/6XQ7ZGDXNtYG2s0b09kJMw" alt="" width="512" height="512" /></p>',
      "Message in subfolder",
      "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
    ];
    assert.deepEqual(joinText(mockObject), arr);
  });

  it("should create libraries", () => {
    let mockLibraries = [
      {
        id: "3195588631115178",
        name: "Testfolder",
        isLibrary: true,
        totalMessages: 0,
      },
      {
        id: "3195588620182363",
        name: "Testfolder/Subfolder",
        isLibrary: true,
        totalMessages: 1,
      },
      {
        id: "3206824598737435",
        name: "Testfolder/Subfolder/Interesting",
        isLibrary: true,
        totalMessages: 1,
      },
    ];
    assert.deepEqual(createLibraries(mockObject), mockLibraries);
  });

  it("should create array of texts", () => {
    let texts = [
      {
        content:
          "<p>This is an HTML with Image.</p>\n" +
          '<p><img src="https://play-lh.googleusercontent.com/6XQ7ZGDXNtYG2s0b09kJMw" alt="" width="512" height="512" /></p>',
        contentType: "text/html",
      },
      { content: "Message in subfolder", contentType: "text/plain" },
      {
        content:
          "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
        contentType: "text/plain",
      },
    ];
    assert.deepEqual(createTexts(mockObject), texts);
  });

  it("should create an array of canned responses", () => {
    let arr = [
      {
        id: "3208409930553392",
        name: "Canned Message",
        text: "This is an HTML with Image.",
        library: "3206824598737435",
        isLibrary: false,
      },
      {
        id: "3195595211854821",
        name: "Message in subfolder",
        text: "Message in subfolder",
        library: "3195588620182363",
        isLibrary: false,
      },
      {
        id: "2888102250465731",
        name: "bye",
        text: "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
        library: "",
        isLibrary: false,
      },
    ];
    assert.deepEqual(createSimplifiedResponse(mockObject), arr);
  });

  it("should merge the libraries and responses", () => {
    let arr = [
      {
        id: "3195588631115178",
        name: "Testfolder",
        isLibrary: true,
        totalMessages: 0,
      },
      {
        id: "3195588620182363",
        name: "Testfolder/Subfolder",
        isLibrary: true,
        totalMessages: 1,
      },
      {
        id: "3206824598737435",
        name: "Testfolder/Subfolder/Interesting",
        isLibrary: true,
        totalMessages: 1,
      },
      {
        id: "3208409930553392",
        name: "Canned Message",
        text: "This is an HTML with Image.",
        library: "3206824598737435",
        isLibrary: false,
      },
      {
        id: "3195595211854821",
        name: "Message in subfolder",
        text: "Message in subfolder",
        library: "3195588620182363",
        isLibrary: false,
      },
      {
        id: "2888102250465731",
        name: "bye",
        text: "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
        library: "",
        isLibrary: false,
      },
    ];
    assert.deepEqual(mergeLibrariesAndResponses(mockObject), arr);
  });
});
