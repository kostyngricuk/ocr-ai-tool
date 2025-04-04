import { useEffect, useRef, useState } from 'react';

export const useFileActions = (defaultValue) => {
  const [file, setFile] = useState(defaultValue);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef.current && file) {
      const fileList = new DataTransfer();
      fileList.items.add(file);
      fileInputRef.current.files = fileList.files;
    }
  }, [file]);

  useEffect(() => {
    const inputFile = fileInputRef.current;
    if (inputFile) {
      inputFile.addEventListener('change', handleChangeFile);
      inputFile.addEventListener('cancel', handleRemoveFile);
      return () => {
        inputFile.removeEventListener('change', handleChangeFile);
        inputFile.removeEventListener('cancel', handleRemoveFile);
      }
    }
  }, [fileInputRef]);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  }

  const handleRemoveFile = () => {
    setFile(null);
  }

  return { file, handleChangeFile, handleRemoveFile, fileInputRef };
}