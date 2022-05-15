import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // define: {
    //   __APP_ENV__: env.APP_ENV,
    // },
  }
})
