import { Mistral } from "@mistralai/mistralai";
import { get } from "lodash";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const getContentByImage = async ({
  question,
  imageURL,
}) => {
  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: question,
            },
            {
              type: "image_url",
              imageUrl: imageURL,
            },
          ],
        },
      ],
    });

    return get(chatResponse, 'choices[0].message.content');
  } catch (error) {
    console.error(error);

    return "Some error occurred while processing your request";
  }
}