import {defineConfig} from "vitest/config";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        include: ["**/*.test.ts"],
        watch: false
    },
});
