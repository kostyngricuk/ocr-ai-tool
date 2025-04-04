import React from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import { useFileActions } from '../../../hooks/useFileActions';
import { downloadFile } from '../../../utils/downloadFile';

type Props = {
  defaultValue: File | null;
};

export const SchemaFileInput = ({ defaultValue }: Props) => {
  const { file, fileInputRef, handleRemoveFile } = useFileActions(defaultValue);

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
          ref={fileInputRef}
        />
      </Button>
      {file && (
        <Stack direction="row" alignItems="center" gap={2}>
          <strong>{file.name}</strong>
          <Stack direction="row">
            <IconButton aria-label="delete" onClick={() => downloadFile(file)} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleRemoveFile} color="primary">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}