import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

/** 终端打印工具页访问地址 */
function startupLog(): Plugin {
  return {
    name: 'startup-log',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const addr = server.httpServer!.address()
        const port = typeof addr === 'object' && addr ? addr.port : 5173
        setTimeout(() => {
          console.log('')
          console.log('  \x1b[36m🔧 内部查询工具：\x1b[0m')
          console.log(`  \x1b[36m   ├─ 资产矩阵    \x1b[0m\x1b[1mhttp://localhost:${port}/#/tool/matrix\x1b[0m`)
          console.log(`  \x1b[36m   ├─ 资产浏览器  \x1b[0m\x1b[1mhttp://localhost:${port}/#/tool/browser\x1b[0m`)
          console.log(`  \x1b[36m   ├─ 方案详情    \x1b[0m\x1b[1mhttp://localhost:${port}/#/tool/solution/sol-001\x1b[0m`)
          console.log(`  \x1b[36m   └─ 案例详情    \x1b[0m\x1b[1mhttp://localhost:${port}/#/tool/case/case-007\x1b[0m`)
          console.log('')
        }, 500)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), startupLog()],
  base: '/',
})
