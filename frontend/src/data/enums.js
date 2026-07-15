/**
 * 受控枚举 — 矩阵坐标轴和所有筛选器都从这里取值。
 * 禁止从数据动态聚合行业和场景，禁止在页面中硬编码。
 */

export const INDUSTRIES = [
  '金融保险',
  '医疗健康',
  '教育培训',
  '政务与公共服务',
  '零售与电商',
  '制造业与工业',
  '物流与供应链',
  '能源与公用事业',
  '文娱传媒',
  '电信与科技',
  '专业服务（法律/咨询/财税等）',
  '产业园区与创新孵化',
  '通用/跨行业',
];

/**
 * 矩阵横轴行业列（排除「通用/跨行业」）
 */
export const MATRIX_INDUSTRIES = INDUSTRIES.filter(i => i !== '通用/跨行业');

export const SCENE_CATEGORIES = [
  '智能交互与客户服务',
  '智能营销与用户增长',
  '内容生成与多语言本地化',
  '知识管理与智能检索',
  '业务流程自动化 (AI+RPA)',
  '研发提效与代码辅助',
  '智能决策与预测分析',
  '内容审核与合规校验',
  '数据洞察与商业分析',
  '智能硬件与边缘AI',
  'AI基础设施与工程化',
];

export const DELIVERY_FORMS = [
  'SaaS工具/平台',
  'API接口',
  '项目定制开发',
  '咨询服务',
  '混合模式',
];

export const MATURITY_LEVELS = [
  '概念/方案阶段',
  '研发/内测阶段',
  '已上线（内部可用）',
  '已上线（对外可售）',
];

export const PROJECT_STATUS = [
  '概念验证(POC)',
  '内测/试点中',
  '已上线（内部使用）',
  '已上线（对外可售）',
  '已下线',
];

/**
 * 枚举英文对照（用于语言切换时显示英文枚举值）。
 * key 为中文原文，value 为英文翻译。
 * 对外由 src/i18n/dict.js 导出，此处为引用来源。
 */
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
