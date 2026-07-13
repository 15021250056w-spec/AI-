# Beyondesoft AI Capability Hub

博彦科技 AI 能力聚合展示与内部查询平台。

## 🚀 快速启动

> ⚠️ `package.json` 在 `frontend/` 子目录内，**必须在 frontend 目录下执行命令**。

```bash
# 进入前端目录
cd frontend

# 安装依赖（首次运行需要）
npm install

# 启动开发服务器
npm run dev
```

启动后访问终端提示的地址（通常为 `http://localhost:5173`）。

**一行版（首次）：**
```bash
cd frontend && npm install && npm run dev
```

### 🌐 访问地址

| 页面 | URL |
|---|---|
| 🏠 **主站首页** | `http://localhost:5173/#/` |
| 🔧 **资产矩阵**（内部工具） | `http://localhost:5173/#/tool/matrix` |
| 🔍 **资产浏览器** | `http://localhost:5173/#/tool/browser` |
| 📋 **方案详情** | `http://localhost:5173/#/tool/solution/sol-001` |
| 📄 **案例详情** | `http://localhost:5173/#/tool/case/case-007` |

> 💡 打开浏览器控制台（F12），启动时会打印所有可用路由。

## 📁 项目结构

```
frontend/
├── src/
│   ├── index.css          # 全局样式 + 设计 Token
│   ├── App.tsx            # 路由入口
│   ├── main.tsx           # React 挂载入口
│   ├── components/        # 通用组件
│   │   ├── Tag.tsx        # 统一标签组件（4种预设状态色）
│   │   ├── Navbar.tsx     # 主站导航栏
│   │   └── Footer.tsx     # 页脚
│   ├── pages/             # 页面
│   │   ├── Home.tsx       # 首页
│   │   ├── List.tsx       # 方案与案例列表
│   │   ├── Detail.tsx     # 案例详情
│   │   ├── SolutionDetail.tsx  # 方案详情
│   │   ├── Capabilities.tsx    # 技术能力全景
│   │   └── tool/          # 内部查询工具
│   │       ├── ToolLayout.tsx      # 工具页统一布局（48px顶栏）
│   │       ├── Matrix.tsx         # 资产概览矩阵
│   │       ├── Browser.tsx        # 资产浏览器（级联筛选）
│   │       ├── SolutionDetail.tsx # 方案详情页
│   │       └── CaseDetail.tsx     # 案例详情页
│   ├── data/              # 标准化数据源
│   │   ├── solutions.ts   # 方案数据（3条）
│   │   └── cases.ts       # 案例数据（9条）
│   ├── utils/             # 工具函数
│   │   └── assetFilter.ts # 资产筛选与级联查询
│   └── mock/              # 旧版 Mock 数据
└── public/                # 静态资源
```

## 🔗 路由一览

| 路由 | 页面 | 说明 |
|---|---|---|
| `/` | 首页 | 主站入口 |
| `/list` | 列表页 | 方案与案例列表 |
| `/capabilities` | 能力全景 | 技术能力展示 |
| `/solution/:id` | 方案详情 | 主站方案详情 |
| `/tool/matrix` | 资产矩阵 | 3×3 交叉概览矩阵 |
| `/tool/browser` | 资产浏览器 | 级联筛选 + 卡片列表 |
| `/tool/solution/:id` | 工具-方案详情 | 方案全貌 + 下属资产 |
| `/tool/case/:id` | 工具-案例详情 | 案例细节 + 关联跳转 |

## 🛠 技术栈

- **构建工具**：Vite 8
- **核心框架**：React 19 + TypeScript 6
- **路由**：react-router-dom v7 (HashRouter)
- **图标**：Lucide React
- **样式**：CSS Variables（主色 `#165DFF`，圆角 `4px`）
