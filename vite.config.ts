import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	base: '/connect/lit-example/',
	plugins: [cloudflare()],
});
