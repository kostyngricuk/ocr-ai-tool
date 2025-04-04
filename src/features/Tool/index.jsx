import { Button, Container, FormGroup, LinearProgress, Stack, TextField } from "@mui/material";
import React, { useActionState, useEffect, useState } from "react";
import Markdown from 'react-markdown'

import { submit } from "./actions";

function Tool() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, formAction, isPending] = useActionState(submit, {});

  useEffect(() => {
    if (response?.status === "success") {
      removeFile();
    }
  }, [response]);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }

  const removeFile = () => {
    setSelectedFile(null);
  }

  return (
    <Stack paddingY={2}>
      <h1>OCR Tool</h1>
      <form action={formAction} style={{ marginBottom: 20 }}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            name="question"
            label="Which data do you want to extract?"
            helperText="Example: What is the name of the person in the image ?"
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              disabled={selectedFile}
              type="url"
              name="fileURL"
              label="File URL"
              helperText="You can use any link to an IMAGE or a PDF file"
            />
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              sx={{ width: 200, height: 55 }}
            >
              Choose file
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                accept="image/*,application/pdf"
                onChange={handleChangeFile}
              />
            </Button>
          </Stack>
          { selectedFile && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ backgroundColor: "#f5f5f5", padding: "5px 15px", borderRadius: 1 }}
            >
              <p><strong>Uploaded file:</strong> {selectedFile.name}</p>
              <Button>
                <span onClick={removeFile}>Remove</span>
              </Button>
            </Stack>
          )}
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      { isPending && <LinearProgress /> }
      { response?.message && (
        <div style={{ backgroundColor: "#f8f8f8", padding: "10 20px", borderRadius: 5, marginTop: 20 }}>
          <Markdown style={{ backgroundColor: "lightGreen" }} children={response?.message} />
        </div>
      )}
    </Stack>
  );
}

export default Tool;
