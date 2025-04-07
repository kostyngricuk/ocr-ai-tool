import { Button, FormGroup, LinearProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Markdown from 'react-markdown'

import { submit } from "./actions";
import { SchemaInput } from "./components/SchemaInput";
import { TargetInput } from "./components/TargetInput";
import { DEFAULT_FIELD_VALUES } from "../../constants/defaultFieldValues";

interface Fields {
  prompt: string;
  fileURL: string;
  schemaFile: File;
  targetFile: File;
}

function Tool() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState({
    status: '',
    message: ''
  })
  const [fields, setFields] = useState<Fields>({
    prompt: DEFAULT_FIELD_VALUES.prompt,
    fileURL: "",
    schemaFile: DEFAULT_FIELD_VALUES.schemaFile,
    targetFile: DEFAULT_FIELD_VALUES.targetFile,
  });

  const handleChange = (fieldName: keyof Fields) => (e) => {
    setFields({
      ...fields,
      [fieldName]: e.target.value
    })
  }

  const handleChangeFile = (fieldName: 'schemaFile' | 'targetFile') => (value: File| null) => {
    setFields({
      ...fields,
      [fieldName]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const result = await submit(fields);
    setResult(result);

    setIsPending(false);
  }

  return (
    <Stack paddingY={2}>
      <h1>OCR AI Tool</h1>
      <form style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            defaultValue={fields.prompt}
            name="prompt"
            label="Prompt"
            onChange={handleChange('prompt')}
          />
          <SchemaInput defaultValue={fields.schemaFile} setFile={handleChangeFile('schemaFile')} />
          <TargetInput defaultValue={fields.targetFile} setFile={handleChangeFile('targetFile')} />
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      { isPending && <LinearProgress /> }
      { !isPending && result.message && (
        <div style={{ backgroundColor: "#f8f8f8", padding: "10px 20px", borderRadius: 5 }}>
          { result.message && <Markdown>{result.message}</Markdown> }
        </div>
      )}
    </Stack>
  );
}

export default Tool;
