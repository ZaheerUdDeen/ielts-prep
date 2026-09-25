import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves a *project* site from https://<user>.github.io/<repo-name>/
// so production assets must be requested under /<repo-name>/.
//
// - The GitHub Actions workflow (.github/workflows/deploy.yml) sets BASE_PATH
//   to "/<your-repo-name>/" automatically, so you normally don't touch this.
// - For a manual build, the fallback below is used. Change REPO_NAME if your
//   GitHub repo is named something other than "ielts-prep-app".
// - `npm run dev` always serves from "/".
const REPO_NAME = 'ielts-prep-app'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? process.env.BASE_PATH || `/${REPO_NAME}/` : '/',
}))
