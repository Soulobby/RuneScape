import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["source/index.ts"],
	platform: "node",
	format: "esm",
	target: "esnext",
	skipNodeModulesBundle: true,
	clean: true,
	splitting: false,
	keepNames: true,
	dts: true,
	sourcemap: true,
	outDir: "distribution",
});
