import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

// run package config
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		"process.env": process.env,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/mixins.scss";`,
			},
		},
	},
	resolve: {
		alias: {
			"@": "/src", // Allows using `@` for the `src` directory
		},
	},
})
