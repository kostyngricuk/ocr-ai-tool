import React, { useEffect, useState, useRef } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import { DEFAULT_FIELD_VALUES } from '../../../constants/defaultFieldValues';

export const SchemaFileInput = () => {
  const [file, setFile] = useState(DEFAULT_FIELD_VALUES.schemaFile);

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

  const downloadFile = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Stack direction="row" spacing={2} marginBottom={2}>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        sx={{ width: 200, height: 55 }}
      >
        Choose schema
        <input
          style={{ display: "none" }}
          type="file"
          name="schemaFile"
          accept="application/json"
          onChange={handleChangeFile}
          ref={fileInputRef}
        />
      </Button>
      {file && (
        <Stack direction="row" alignItems="center" gap={2}>
          <strong>{file.name}</strong>
          <Stack direction="row">
            <IconButton aria-label="delete" onClick={downloadFile} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => setFile(null)} color="primary">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}