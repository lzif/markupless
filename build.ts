import dts from "bun-plugin-dts";
import esbuildCleanOutdir from "esbuild-plugin-clean-outdir";

await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./out",
	minify: true,
	splitting: true,
	sourcemap: true,
	target: "browser",
	tsconfig: "./tsconfig.json",
	plugins: [esbuildCleanOutdir(), dts()],
});
