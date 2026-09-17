import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// GitHub Pages 是静态托管，直接打开 /hot-items 这类页面路径会 404。
// 构建后把首页复制一份为 404.html：访问不存在的路径时 GitHub Pages 会返回它，
// React 路由会根据网址自动渲染对应页面（刷新、分享链接都不会再 404）。
// 同时生成 version.json：网站前端定时 fetch 这个文件，发现 hash 变了就自动刷新，
// 解决「后台改了内容但浏览器还显示旧缓存」的问题。
const spaFallback = (): Plugin => ({
  name: 'spa-404-fallback',
  closeBundle() {
    if (fs.existsSync('dist/index.html')) {
      fs.copyFileSync('dist/index.html', 'dist/404.html')
    }
    // 生成版本标识文件（每次构建 hash 不同 → 前端检测到变化自动刷新）
    const version = { hash: Date.now().toString(36), builtAt: new Date().toISOString() }
    fs.writeFileSync('dist/version.json', JSON.stringify(version))
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