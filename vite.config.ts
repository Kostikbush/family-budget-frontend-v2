import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	mode: "cross-env",
	resolve: {
		alias: [
			{ find: "@", replacement: path.resolve(__dirname, "src") },
			{ find: "app", replacement: path.resolve(__dirname, "src/app") },
			{
				find: "entities",
				replacement: path.resolve(__dirname, "src/entities"),
			},
			{
				find: "layout",
				replacement: path.resolve(__dirname, "src/layout"),
			},
			{
				find: "features",
				replacement: path.resolve(__dirname, "src/features"),
			},
			{
				find: "widgets",
				replacement: path.resolve(__dirname, "src/widgets"),
			},
			{ find: "page", replacement: path.resolve(__dirname, "src/page") },
			{ find: "shared", replacement: path.resolve(__dirname, "src/shared") },
		],
	},
});
