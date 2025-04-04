export const getTextFromFile = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};