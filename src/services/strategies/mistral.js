import { Mistral } from "@mistralai/mistralai";
import mime from 'mime';
import { get } from "lodash";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const getFileEntity = async (file) => {
  const fileData = await fetch(file);
  if (!fileData.ok) {
    console.error(`Failed to fetch the file: ${file}`);
    throw new Error(`Failed to fetch the file`);
  }

  const fileMimeType = fileData.headers.get('content-type');
  const fileType = mime.getExtension(fileMimeType);
  switch (fileType) {
    case 'pdf':
      return {
        type: "document_url",
        documentUrl: file,
      };
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: "image_url",
        imageUrl: file,
      };
    default:
      throw new Error(`Unsupported file type - ${fileType} (${fileMimeType})`);
  }
}

export const getContentByFile = async ({
  context,
  file,
}) => {
  const fileEntity = await getFileEntity(file);

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