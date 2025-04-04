import { Mistral } from "@mistralai/mistralai";
import mime from 'mime';
import { get } from "lodash";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const getFileEntity = async (fileURL) => {
  const file = await fetch(fileURL);
  if (!file.ok) {
    throw new Error(`Failed to fetch file: ${file.statusText}`);
  }

  const fileMimeType = file.headers.get('content-type');
  const fileType = mime.getExtension(fileMimeType);
  switch (fileType) {
    case 'pdf':
      return {
        type: "document_url",
        documentUrl: fileURL,
      };
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: "image_url",
        imageUrl: fileURL,
      };
    default:
      throw new Error("Unsupported file type");
  }
}

export const getContentByFile = async ({
  context,
  fileURL,
}) => {
  const fileEntity = await getFileEntity(fileURL);

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: context,
            },
            fileEntity,
          ],
        },
      ],
    });

    return get(chatResponse, 'choices[0].message.content');
  } catch (error) {
    throw new Error(`Error processing image: ${error.message}`);
  }
}