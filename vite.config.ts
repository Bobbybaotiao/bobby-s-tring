import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// GitHub Pages 是静态托管，直接打开 /hot-items 这类页面路径会 404。
// 构建后把首页复制一份为 404.html：访问不存在的路径时 GitHub Pages 会返回它，
// React 路由会根据网址自动渲染对应页面（刷新、分享链接都不会再 404）。
const spaFallback = (): Plugin => ({
  name: 'spa-404-fallback',
  closeBundle() {
    if (fs.existsSync('dist/index.html')) {
      fs.copyFileSync('dist/index.html', 'dist/404.html')
    }
  },
})

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/bobby-s-tring/' : '/',
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))