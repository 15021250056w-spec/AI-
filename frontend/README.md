# Beyondesoft 官网前端项目

本项目是基于现代 B 端企业级 SaaS 风格设计的公司官网前端应用。整体设计语言强调专业、严谨、高效与可信赖，运用大量留白和冷色调（科技蓝）传达理性的科技感。

## 🛠 技术栈

*   **构建工具**：[Vite](https://vitejs.dev/) - 极速的前端构建工具
*   **核心框架**：[React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) - 保证代码健壮性和可维护性
*   **样式方案**：纯 CSS (Vanilla CSS) + CSS Variables - 实现了完善的 Design Tokens
*   **图标库**：[Lucide React](https://lucide.dev/) - 简洁现代的开源图标集

## ✨ 核心特性

-   **企业级设计系统**：严格遵守视觉规范，已实现全局色板、柔和阴影、字体排版系统的 CSS 变量映射。
-   **现代视觉交互**：包含毛玻璃导航栏（Backdrop-filter blur）、软阴影悬浮卡片以及微交互动效。
-   **响应式布局**：基于 12 列栅格系统构建的基础结构。

## 🚀 快速开始

### 前提条件
请确保您的计算机上已安装了 [Node.js](https://nodejs.org/) (推荐版本 v18.0.0 以上)。

### 安装依赖

```bash
# 进入前端项目目录
cd frontend

# 安装所有必要依赖
npm install
```

### 本地开发

```bash
# 启动本地开发服务器
npm run dev
```

启动后，访问终端中提示的本地地址（通常为 `http://localhost:5173`）即可预览页面。

### 构建生产版本

```bash
# 执行打包构建
npm run build
```
构建产生的文件将会存放在 `dist/` 目录中，可直接用于部署。

## 📁 目录结构说明

```
frontend/
├── index.html          # HTML 模板入口
├── package.json        # 项目配置和依赖清单
├── src/
│   ├── index.css       # 全局样式文件（包含所有设计规范 Token）
│   ├── App.tsx         # 核心页面组件（包含导航、Hero区、特性说明等）
│   ├── main.tsx        # React 挂载入口
│   └── vite-env.d.ts   # Vite 环境变量类型声明
```

## 🎨 设计规范参考

项目中使用的颜色和排版均来自最初设定的设计规范，核心 Token 位于 `src/index.css` 的 `:root` 中。如需调整主色调或基础参数，请直接修改该文件即可全局生效。
