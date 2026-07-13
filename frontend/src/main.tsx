import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 启动时在浏览器控制台输出可用路由
console.log(
  '\n%c🚀 Beyondesoft AI Capability Hub %c已启动',
  'font-size:16px;font-weight:bold;color:#1E4696',
  'color:#4E5969',
)
console.log(
  '%c🏠 主站首页：%c%s%c#/',
  'color:#1E4696', 'color:#2B65EC;font-weight:bold', window.location.origin + '/', 'color:#86909C'
)
console.log(
  '%c🔧 内部工具：%c%s%c#/tool/matrix',
  'color:#1E4696', 'color:#2B65EC;font-weight:bold', window.location.origin + '/', 'color:#86909C'
)
console.log(
  '%c   ├─ 资产矩阵   %c#/tool/matrix',
  'color:#86909C', 'color:#2B65EC'
)
console.log(
  '%c   ├─ 资产浏览器 %c#/tool/browser',
  'color:#86909C', 'color:#2B65EC'
)
console.log(
  '%c   ├─ 方案详情   %c#/tool/solution/:id',
  'color:#86909C', 'color:#2B65EC'
)
console.log(
  '%c   └─ 案例详情   %c#/tool/case/:id\n',
  'color:#86909C', 'color:#2B65EC'
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
