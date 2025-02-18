import { defineConfig } from "vite";

export default defineConfig({
	plugins: [],
	resolve: {},
	test: {
		environment: "jsdom", // or 'node'
	},
});
