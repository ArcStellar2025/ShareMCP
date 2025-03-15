import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 禁用压缩大小报告，加快构建速度
    reportCompressedSize: false,
    // 增加警告限制
    chunkSizeWarningLimit: 2000,
  },
  esbuild: {
    // 跳过类型检查
    pure: ['console.log'],
    // 使用 esbuild 转译 TypeScript，不进行类型检查
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
        skipDefaultLibCheck: true,
      }
    }
  }
})
