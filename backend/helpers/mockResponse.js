// here I created a mock response
export const mockObject = {
  id: "0",
  name: null,
  parentId: null,
  folderType: "chatCannedMessages",
  folders: [
    {
      id: 3195588631115178,
      name: "Testfolder",
      parentId: null,
      folderType: "chatCannedMessages",
      folders: [
        {
          id: "3195588620182363",
          name: "Subfolder",
          parentId: "3195588631115178",
          folderType: "chatCannedMessages",
          folders: [
            {
              id: "3206824598737435",
              name: "Interesting",
              parentId: "3195588620182363",
              folderType: "chatCannedMessages",
              folders: [],
              items: [
                {
                  id: "3208409930553392",
                  name: "Canned Message",
                  folderId: "3206824598737435",
                  updated: "2022-05-27T07:28:40.450Z",
                  frontendFolderId: null,
                  text: "<p>This is an HTML with Image.</p>",
                  keywords: "test",
                  subject: "What kind of subject",
                  slashCommand: "test",
                  language: "en-US",
                  setupItemId: "3208409930553392",
                },
              ],
            },
          ],
          items: [
            {
              id: "3195595211854821",
              name: "Message in subfolder",
              folderId: "3195588620182363",
              updated: "2022-05-19T12:05:39.503Z",
              frontendFolderId: null,
              text: "Message in subfolder",
              keywords: "test",
              subject: "Message in subfolder",
              slashCommand: "sub",
              language: "bn-BD",
              setupItemId: "3195595211854821",
            },
          ],
        },
      ],
      items: [],
    },
  ],
  items: [
    {
      id: "2888102250465731",
      name: "bye",
      folderId: null,
      updated: "2022-05-25T11:15:36.367Z",
      frontendFolderId: null,
      text: "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
      keywords: "bye",
      subject: null,
      slashCommand: null,
      language: null,
      setupItemId: "2888102250465731",
    },
  ],
};

export const mockMessage = {
  id: 2888102250465731,
  name: "bye",
  folderId: null,
  updated: "2022-05-25T11:15:36.367Z",
  frontendFolderId: null,
  text: "Thanks for contacting us.  Please do not hesitate to contact us again if we can be of further assistance.",
  keywords: "bye",
  subject: null,
  slashCommand: null,
  language: null,
  setupItemId: "2888102250465731",
};
console.log(mockObject.folders.length);
