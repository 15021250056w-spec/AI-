# Beyondesoft AI Capability Hub

博彦科技 AI 能力聚合展示与内部查询平台。现代 B 端企业级风格，设计语言强调专业、严谨、高效，运用冷色调（科技蓝 `#165DFF`）传达理性科技感。

## 🚀 快速开始

### 前提条件

请确保已安装 [Node.js](https://nodejs.org/)（推荐 v18.0.0 以上）。

### 安装与启动

```bash
# 安装依赖（首次）
npm install

# 启动本地开发服务器
npm run dev
```

启动后访问终端提示的本地地址（通常为 `http://localhost:5173`）即可预览。

### 其他命令

```bash
npm run build      # 生产构建 → dist/
npm run preview    # 预览生产构建
npm run lint       # 代码检查
npm run deploy     # 部署到 GitHub Pages
```

## 🛠 技术栈

| 类别 | 技术 |
|---|---|
| 构建工具 | [Vite 8](https://vitejs.dev/) |
| 核心框架 | [React 19](https://react.dev/) + [TypeScript 6](https://www.typescriptlang.org/) |
| 路由 | [react-router-dom v7](https://reactrouter.com/) (HashRouter) |
| 图标 | [Lucide React](https://lucide.dev/) |
| 样式 | 纯 CSS + CSS Variables（Design Tokens） |
| 工具函数 | classnames |

## 🔗 路由结构

### 主站路由

| 路由 | 页面 | 说明 |
|---|---|---|
| `/` | Home | 首页，全屏滚动展示 |
| `/list` | List | 方案与案例列表 |
| `/detail/:id` | Detail | 案例详情 |
| `/solution/:id` | SolutionDetail | 主站方案详情 |
| `/capabilities` | Capabilities | 技术能力全景库 |

### 内部查询工具 `/tool`

| 路由 | 页面 | 说明 |
|---|---|---|
| `/tool/matrix` | 资产矩阵 | 3 能力域 × 3 行业交叉概览矩阵 |
| `/tool/browser` | 资产浏览器 | 级联筛选 + 排序 + URL 同步 + 卡片网格 |
| `/tool/solution/:id` | 工具-方案详情 | 含面包屑、信息卡片、下属资产列表 |
| `/tool/case/:id` | 工具-案例详情 | 含面包屑、归属方案、可点击标签跳转 |

`/tool` 默认重定向至 `/tool/matrix`。

## 📁 目录结构

```
src/
├── index.css            # 全局样式 + Design Tokens
├── App.tsx              # 路由入口
├── main.tsx             # React 挂载入口
├── components/          # 通用组件
│   ├── Tag.tsx          # 统一标签（4种状态色：方案/客户案例/能力储备/标签）
│   ├── Navbar.tsx       # 主站导航栏
│   ├── Footer.tsx       # 页脚
│   └── DataCard.tsx     # 数据卡片
├── pages/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── List.tsx         # 列表页
│   ├── Detail.tsx       # 主站详情
│   ├── SolutionDetail.tsx  # 主站方案详情
│   ├── Capabilities.tsx    # 能力全景
│   └── tool/            # 内部查询工具
│       ├── ToolLayout.tsx      # 工具页统一布局（48px 粘性顶栏）
│       ├── Matrix.tsx         # 资产概览矩阵
│       ├── Browser.tsx        # 资产浏览器（级联筛选 + URL 同步）
│       ├── SolutionDetail.tsx # 方案详情页
│       └── CaseDetail.tsx     # 案例/能力详情页
├── data/                # 标准化数据源
│   ├── solutions.ts     # 方案数据（3条，含完整字段定义）
│   └── cases.ts         # 案例数据（9条，含完整字段定义）
├── utils/               # 工具函数
│   └── assetFilter.ts   # 资产筛选工具（聚合/级联/标签/行业查询）
└── mock/                # 旧版 Mock 数据（主站使用）
    ├── data.ts
    └── db.json
```

## 🎨 设计规范

核心 Token 位于 `src/index.css` 的 `:root` 中：

- **主色**：`#165DFF`（统一深蓝）
- **辅助色**：`#E8F0FE`（浅蓝底）、`#F0F2F5`（灰色底）
- **圆角**：统一 `4px`
- **字体**：Inter + 系统字体栈
- **卡片/按钮/标签**：纯色背景，无渐变、无多余阴影

如需调整主色调或基础参数，直接修改 `:root` 对应变量即可全局生效。
