import { Button, Container, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import { getContentByImage } from "../../services/mistral-ai";
import { isEmpty } from "lodash";

function Tool() {
  const [question, setQuestion] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [response, setResponse] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeQuestion = (e) => {
    setResponse(null);
    setQuestion(e.target.value);
  }

  const handleChangeImageURL = (e) => {
    setResponse(null);
    setImageURL(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await getContentByImage({
      question,
      imageURL,
    });
    setResponse(response);
    setIsLoading(false);
  };

  const isDisabledButton = isLoading || isEmpty(question) || isEmpty(imageURL);

  return (
    <Container>
      <h1>OCR Tool</h1>
      <form>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Which data do you want to extract?"
            id="question"
            onChange={handleChangeQuestion}
          />
          <TextField
            fullWidth
            type="url"
            label="Image URL"
            id="iamgeURL"
            onChange={handleChangeImageURL}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isDisabledButton}
          >Process</Button>
        </FormGroup>
      </form>
      {
        isLoading && (
          <div style={{ marginTop: 20 }}>
            <p>Loading...</p>
          </div>
        )
      }
      <p>{response}</p>
    </Container>
  );
}

export default Tool;