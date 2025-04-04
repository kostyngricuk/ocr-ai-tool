import { Mistral } from "@mistralai/mistralai";
import { get } from "lodash";
import { getFileType } from "../../utils/getFileType";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const getFileEntity = async (file) => {
  const fileType = await getFileType(file);

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
      throw new Error(`Unsupported file type - ${fileType}`);
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