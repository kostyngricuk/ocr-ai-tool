"use server";

import { ACTION_STATUSES } from "../../constants/actions";
import Ocr from "../../services/ocr";
import { getBase64 } from "../../utils/getBase64";

export const submit = async (_, queryData) => {
  const fields = {
    question: queryData.get("question"),
    fileURL: queryData.get("fileURL"),
    file: queryData.get("file"),
  }

  const file = fields.fileURL || await getBase64(fields.file);

  if (!fields.question || !file) {
    return {
      status: ACTION_STATUSES.error,
      message: "Please provide a question and a file",
    }
  }

  try {
    const message = await Ocr.getContentByFile({
      context: fields.question,
      file,
    });

    if (!message) {
      return {
        response: {
          status: ACTION_STATUSES.error,
          message: "No data found",
        }
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