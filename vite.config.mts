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
        include: ["**/*.unit.test.ts"],
        watch: false
    },
});
