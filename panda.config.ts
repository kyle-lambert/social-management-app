import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  outExtension: "js",
  preflight: true,
  include: ["./app/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  strictTokens: true,
  outdir: "styled-system",
  emitPackage: true,
});
