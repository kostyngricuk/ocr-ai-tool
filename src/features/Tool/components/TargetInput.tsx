import React, { useEffect, useState, useRef } from 'react';
import { Button, IconButton } from "@mui/material";
import { Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { DEFAULT_FIELD_VALUES } from '../../../constants/defaultFieldValues';

export const TargetInput = () => {
  const [file, setFile] = useState(DEFAULT_FIELD_VALUES.targetFile);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef.current && file) {
      const fileList = new DataTransfer();
      fileList.items.add(file);
      fileInputRef.current.files = fileList.files;
    }
  }, [file]);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          disabled={file}
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
            name="targetFile"
            accept="image/*,application/pdf"
            onChange={handleChangeFile}
            ref={fileInputRef}
          />
        </Button>
      </Stack>
      {file && (
        <Stack direction="row" alignItems="center" gap={1}>
          <strong>{file.name}</strong>
          <IconButton aria-label="delete" onClick={() => setFile(null)} color="primary">
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
}