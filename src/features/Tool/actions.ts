"use server";

import { ACTION_STATUSES } from "../../constants/actions";
import Ocr from "../../services/ocr";
import { getBase64 } from "../../utils/getBase64";
import { getTextFromFile } from "../../utils/getTextFromFile";

export const submit = async ({
  prompt,
  schemaFile,
  fileURL,
  targetFile
}) => {
  const schema = schemaFile?.name ? await getTextFromFile(schemaFile) : null;
  const file = targetFile?.name ? await getBase64(targetFile) : fileURL;

  if (!prompt || !file) {
    return {
      status: ACTION_STATUSES.error,
      message: "Please provide all required data",
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
      }
    }

    return {
      status: ACTION_STATUSES.success,
      message,
    }
  } catch (error) {
    return {
      status: ACTION_STATUSES.error,
      message: error.message,
    }
  }
};