import { Button, FormGroup, LinearProgress, Stack, TextField } from "@mui/material";
import React, { useActionState, useState } from "react";
import Markdown from 'react-markdown'

import { submit } from "./actions";
import { SchemaFileInput } from "./components/SchemaFileInput";
import { TargetInput } from "./components/TargetInput";
import { DEFAULT_FIELD_VALUES } from "../../constants/defaultFieldValues";

function Tool() {
  const [prompt, setPrompt] = useState(DEFAULT_FIELD_VALUES.prompt);

  const [response, formAction, isPending] = useActionState(submit, {});

  return (
    <Stack paddingY={2}>
      <h1>OCR AI Tool</h1>
      <form action={formAction} style={{ marginBottom: 20 }}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            name="prompt"
            label="Which data do you want to extract?"
            helperText="Example: What is the name of the person in the image ?"
          />
          <SchemaFileInput />
          <TargetInput />
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      { isPending && <LinearProgress /> }
      { !isPending && response?.message && (
        <div style={{ backgroundColor: "#f8f8f8", padding: "10px 20px", borderRadius: 5 }}>
          { response?.message && <Markdown children={response?.message} /> }
        </div>
      )}
    </Stack>
  );
}

export default Tool;
