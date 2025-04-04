import { Button, FormGroup, LinearProgress, Stack, TextField } from "@mui/material";
import React, { useActionState } from "react";
import Markdown from 'react-markdown'

import { submit } from "./actions";
import { SchemaFileInput } from "./components/SchemaFileInput";
import { TargetInput } from "./components/TargetInput";
import { DEFAULT_FIELD_VALUES } from "../../constants/defaultFieldValues";

function Tool() {
  const [{ message, fields }, formAction, isPending] = useActionState(submit, {
    fields: {
      prompt: DEFAULT_FIELD_VALUES.prompt,
      fileURL: "",
      targetFile: DEFAULT_FIELD_VALUES.targetFile,
      schemaFile: DEFAULT_FIELD_VALUES.schemaFile,
    },
    message: null,
  });

  return (
    <Stack paddingY={2}>
      <h1>OCR AI Tool</h1>
      <form action={formAction} style={{ marginBottom: 20 }}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            defaultValue={fields.prompt}
            name="prompt"
            label="Prompt"
          />
          <SchemaFileInput defaultValue={fields.schemaFile} />
          <TargetInput defaultValue={fields.targetFile} />
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      { isPending && <LinearProgress /> }
      { !isPending && message && (
        <div style={{ backgroundColor: "#f8f8f8", padding: "10px 20px", borderRadius: 5 }}>
          { message && <Markdown>{message}</Markdown> }
        </div>
      )}
    </Stack>
  );
}

export default Tool;
