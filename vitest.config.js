import { defineConfig } from "vite";

export default defineConfig({
	plugins: [],
	resolve: {},
	test: {
		passWithNoTests: true,
		environment: "jsdom", // or 'node'
	},
});
