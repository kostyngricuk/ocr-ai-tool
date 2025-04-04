import { Button, Container, FormGroup, LinearProgress, TextField } from "@mui/material";
import React, { useActionState } from "react";

import { submit } from "./actions";

function Tool() {
  const [{ status, message }, formAction, isPending] = useActionState(submit, {});

  return (
    <Container>
      <h1>OCR Tool</h1>
      <form action={formAction}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            name="question"
            label="Which data do you want to extract?"
            helperText="Example: What is the name of the person in the image ?"
          />
          <TextField
            required
            fullWidth
            type="url"
            name="fileURL"
            label="File URL"
            helperText="You can use any link to an IMAGE or a PDF file"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      <p>
        { isPending ? <LinearProgress /> : message }
      </p>
    </Container>
  );
}

export default Tool;