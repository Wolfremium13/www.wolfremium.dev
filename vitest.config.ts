import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        includeSource: ['./**/*.{js,ts,tsx}'],
        exclude: [
            'node_modules/**',
            '.next/**',
            'tests/e2e/**',
        ],
    },
    resolve: {
        alias: {
            '@': './',
        }
    }
})