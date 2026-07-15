/**
 * dict.js — 中英文 UI 文案字典 + 枚举翻译
 *
 * 覆盖全站所有界面文字。工具页面通过 LangContext 获取当前语言字典，
 * 无需引入第三方 i18n 库。
 */

/* ================================================================
 * 枚举值中 → 英对照
 * ================================================================ */

export const ENUM_EN = {
  INDUSTRIES: {
    '金融保险': 'Finance & Insurance',
    '医疗健康': 'Healthcare',
    '教育培训': 'Education & Training',
    '政务与公共服务': 'Government & Public Services',
    '零售与电商': 'Retail & E-commerce',
    '制造业与工业': 'Manufacturing & Industry',
    '物流与供应链': 'Logistics & Supply Chain',
    '能源与公用事业': 'Energy & Utilities',
    '文娱传媒': 'Media & Entertainment',
    '电信与科技': 'Telecom & Technology',
    '专业服务（法律/咨询/财税等）': 'Professional Services',
    '产业园区与创新孵化': 'Industrial Parks & Incubation',
    '通用/跨行业': 'General / Cross-Industry',
  },
  SCENE_CATEGORIES: {
    '智能交互与客户服务': 'Intelligent Interaction & Customer Service',
    '智能营销与用户增长': 'Intelligent Marketing & User Growth',
    '内容生成与多语言本地化': 'Content Generation & Multilingual Localization',
    '知识管理与智能检索': 'Knowledge Management & Intelligent Search',
    '业务流程自动化 (AI+RPA)': 'Business Process Automation (AI+RPA)',
    '研发提效与代码辅助': 'R&D Efficiency & Code Assistance',
    '智能决策与预测分析': 'Intelligent Decision-Making & Predictive Analytics',
    '内容审核与合规校验': 'Content Moderation & Compliance',
    '数据洞察与商业分析': 'Data Insights & Business Analytics',
    '智能硬件与边缘AI': 'Smart Hardware & Edge AI',
    'AI基础设施与工程化': 'AI Infrastructure & Engineering',
  },
  DELIVERY_FORMS: {
    'SaaS工具/平台': 'SaaS Tool / Platform',
    'API接口': 'API',
    '项目定制开发': 'Custom Development',
    '咨询服务': 'Consulting',
    '混合模式': 'Hybrid',
  },
  MATURITY_LEVELS: {
    '概念/方案阶段': 'Concept / Proposal',
    '研发/内测阶段': 'R&D / Internal Testing',
    '已上线（内部可用）': 'Live (Internal)',
    '已上线（对外可售）': 'Live (Commercially Available)',
  },
  PROJECT_STATUS: {
    '概念验证(POC)': 'Proof of Concept',
    '内测/试点中': 'Internal Testing / Pilot',
    '已上线（内部使用）': 'Live (Internal Use)',
    '已上线（对外可售）': 'Live (Commercially Available)',
    '已下线': 'Retired',
  },
};

/* ================================================================
 * 中文字典
 * ================================================================ */

export const zh = {
  // === 系统 / 导航 ===
  systemName: '全球AI能力中心',
  tabMatrix: '矩阵总览',
  tabBrowser: '列表检索',
  langLabel: '中',
  langSwitch: 'EN',

  // === 矩阵页 ===
  matrixTitle: '全球AI能力中心',
  matrixSubtitle: (solutions, cases, date) =>
    `覆盖 ${solutions} 个方案、${cases} 个案例 | 更新于 ${date}`,
  modeCase: '案例模式',
  modeSolution: '方案模式',
  legendNoData: '暂无案例数据',
  legendSolutionHint: '标签 = 方案；空白格 = 该行业 × 场景暂无布局',
  viewAll: (n) => `查看全部（${n}）`,
  matrixCorner: '场景分类 ＼ 行业',

  // === 列表检索筛选器 ===
  filterType: '资产类型',
  typeAll: '全部',
  typeSolution: '方案',
  typeCase: '案例',
  filterIndustry: '目标行业',
  industryAll: '全部行业',
  filterScene: '场景分类',
  sceneAll: '全部场景',
  filterBizLabels: (n) => `业务标签（${n}）`,
  filterTechLabels: (n) => `技术标签（${n}）`,
  expandMore: (n) => `展开更多（${n}）`,
  collapse: '收起',
  noLabels: '暂无标签',
  resetAll: '重置全部筛选',
  currentFilter: '当前筛选：',
  clearAll: '全部清除',
  searchPlaceholder: '搜索资产名称、标签…',
  resultCount: (n) => `共 ${n} 条结果`,
  filterBtn: '筛选',

  // === 表格 ===
  colType: '类型',
  colName: '中文名称',
  colSummary: '一句话简介',
  colIndustry: '行业',
  colScene: '场景分类',
  colStatus: '状态',
  colUpdateDate: '更新日期',
  colActions: '操作',
  labelSolution: '方案',
  labelCase: '案例',

  // === 空状态 ===
  emptyTitle: '未找到匹配的资产',
  emptyDesc: '当前筛选条件下无结果，请尝试调整或重置筛选条件',

  // === 详情面板 ===
  sectionBasicInfo: '基本信息',
  sectionDetail: '详细说明',
  sectionRelatedCases: (n) => `关联案例（${n}）`,
  sectionParentSolution: '归属方案',
  sectionProjectBg: '项目背景',
  sectionEffectData: '效果数据',
  sectionBizLabels: '业务标签',
  sectionTechLabels: '技术标签',
  fieldNameZh: '中文名称',
  fieldNameEn: '英文名称',
  fieldType: '类型',
  fieldIndustry: '行业',
  fieldScene: '场景分类',
  fieldRegionLang: '适用地区/语言',
  fieldDeliveryForm: '交付形式',
  fieldMaturity: '成熟度',
  fieldClient: '客户',
  fieldProjectStatus: '项目状态',
  fieldParentSolution: '归属方案',
  fieldBu: 'BU',
  fieldContact: '联系人',
  fieldUpdateDate: '更新日期',
  btnContact: '取得联系',
  btnCopyLink: '复制链接',
  btnViewSolution: '查看方案',
  noDescription: '暂无描述',
  comingSoon: '完整详情将在后续版本中提供',
  relatedCaseCount: (n) => `关联${n}个案例`,
  belongsTo: (name) => `归属：${name}`,

  // === 资产未找到 ===
  assetNotFound: '资产未找到',
  assetNotFoundDesc: (id) => `未找到 ID 为 ${id} 的资产。`,
};

/* ================================================================
 * 英文字典
 * ================================================================ */

export const en = {
  // === System / Navigation ===
  systemName: 'Global AI Capability Hub',
  tabMatrix: 'Matrix Overview',
  tabBrowser: 'List Browser',
  langLabel: 'EN',
  langSwitch: '中',

  // === Matrix ===
  matrixTitle: 'Global AI Capability Hub',
  matrixSubtitle: (solutions, cases, date) =>
    `Covering ${solutions} solutions, ${cases} cases | Updated ${date}`,
  modeCase: 'Case Mode',
  modeSolution: 'Solution Mode',
  legendNoData: 'No case data',
  legendSolutionHint: 'Tag = Solution; Empty cell = No assets for this industry × scene',
  viewAll: (n) => `View All (${n})`,
  matrixCorner: 'Scene ＼ Industry',

  // === Browser Filters ===
  filterType: 'Asset Type',
  typeAll: 'All',
  typeSolution: 'Solution',
  typeCase: 'Case',
  filterIndustry: 'Target Industry',
  industryAll: 'All Industries',
  filterScene: 'Scene Category',
  sceneAll: 'All Scenes',
  filterBizLabels: (n) => `Business Labels (${n})`,
  filterTechLabels: (n) => `Tech Labels (${n})`,
  expandMore: (n) => `Show More (${n})`,
  collapse: 'Collapse',
  noLabels: 'No labels',
  resetAll: 'Reset All Filters',
  currentFilter: 'Active Filters:',
  clearAll: 'Clear All',
  searchPlaceholder: 'Search by name or label…',
  resultCount: (n) => `${n} result${n !== 1 ? 's' : ''}`,
  filterBtn: 'Filters',

  // === Table ===
  colType: 'Type',
  colName: 'Name',
  colSummary: 'Summary',
  colIndustry: 'Industry',
  colScene: 'Scene',
  colStatus: 'Status',
  colUpdateDate: 'Updated',
  colActions: '',
  labelSolution: 'Solution',
  labelCase: 'Case',

  // === Empty State ===
  emptyTitle: 'No matching assets found',
  emptyDesc: 'No results under current filters. Please adjust or reset your filters.',

  // === Detail Panel ===
  sectionBasicInfo: 'Basic Info',
  sectionDetail: 'Details',
  sectionRelatedCases: (n) => `Related Cases (${n})`,
  sectionParentSolution: 'Parent Solution',
  sectionProjectBg: 'Project Background',
  sectionEffectData: 'Results & Impact',
  sectionBizLabels: 'Business Labels',
  sectionTechLabels: 'Tech Labels',
  fieldNameZh: 'Chinese Name',
  fieldNameEn: 'English Name',
  fieldType: 'Type',
  fieldIndustry: 'Industry',
  fieldScene: 'Scene Category',
  fieldRegionLang: 'Region / Language',
  fieldDeliveryForm: 'Delivery Form',
  fieldMaturity: 'Maturity',
  fieldClient: 'Client',
  fieldProjectStatus: 'Project Status',
  fieldParentSolution: 'Parent Solution',
  fieldBu: 'BU',
  fieldContact: 'Contact',
  fieldUpdateDate: 'Updated',
  btnContact: 'Get in Touch',
  btnCopyLink: 'Copy Link',
  btnViewSolution: 'View Solution',
  noDescription: 'No description',
  comingSoon: 'Full details coming in a future release',
  relatedCaseCount: (n) => `${n} case${n !== 1 ? 's' : ''}`,
  belongsTo: (name) => `Under: ${name}`,

  // === Asset Not Found ===
  assetNotFound: 'Asset Not Found',
  assetNotFoundDesc: (id) => `No asset found with ID: ${id}`,
};
