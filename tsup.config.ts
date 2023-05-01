import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	platform: "node",
	format: "esm",
	target: "esnext",
	skipNodeModulesBundle: true,
	clean: true,
	splitting: false,
	keepNames: true,
	dts: true,
	sourcemap: true,
});
