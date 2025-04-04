"use server";

import { ACTION_STATUSES } from "../../constants/actions";
import Ocr from "../../services/ocr";

export const submit = async (prevState, queryData) => {
  const fields = {
    question: queryData.get("question"),
    fileURL: queryData.get("fileURL"),
  }

  if (!fields.question || !fields.fileURL) {
    return {
      status: ACTION_STATUSES.error,
      message: "Please provide a question and an image URL.",
    }
  }

  try {
    const message = await Ocr.getContentByFile({
      context: fields.question,
      fileURL: fields.fileURL,
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