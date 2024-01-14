import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import rollupReplace from "@rollup/plugin-replace";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: [
      {
        // "@": path.resolve(__dirname, "./src"),
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },

  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
  ],
});

