"use server";

import { ACTION_STATUSES } from "../../constants/actions";
import Ocr from "../../services/ocr";
import { getBase64 } from "../../utils/getBase64";
import { getTextFromFile } from "../../utils/getTextFromFile";

export const submit = async (previousState, queryData) => {
  const fields = {
    prompt: queryData.get("prompt"),
    fileURL: queryData.get("fileURL"),
    targetFile: queryData.get("targetFile"),
    schemaFile: queryData.get("schemaFile"),
  }

  console.log(previousState.fields.schemaFile, fields.schemaFile);

  const prompt = fields.prompt;
  const file = fields.targetFile?.name ? await getBase64(fields.targetFile) : fields.fileURL;
  const schema = fields.schemaFile?.name ? await getTextFromFile(fields.schemaFile) : null;

  if (!prompt || !file) {
    return {
      status: ACTION_STATUSES.error,
      message: "Please provide all required data",
      fields: previousState.fields,
    }
  }

  try {
    const message = await Ocr.getContentByFile({
      prompt,
      schema,
      file,
    });

    if (!message) {
      return {
        status: ACTION_STATUSES.error,
        message: "No data found",
        fields: previousState.fields,
      }
    }

    return {
      status: ACTION_STATUSES.success,
      message,
      fields
    }
  } catch (error) {
    return {
      status: ACTION_STATUSES.error,
      message: error.message,
      fields: previousState.fields,
    }
  }
};