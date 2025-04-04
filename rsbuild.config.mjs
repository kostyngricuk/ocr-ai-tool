import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: "OCR AI Tool",
  },
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env': JSON.stringify(process.env),
    },
  },
});
