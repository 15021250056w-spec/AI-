/**
 * 共享常量 — 资产类型标签映射 & 下拉选项
 * 全站统一引用，避免各页面重复定义
 */

/** 资产类型 → 中文展示文本 */
export const TYPE_LABEL: Record<string, string> = {
  solution: '方案',
  clientCase: '客户项目',
  capability: '能力储备',
};

/** 资产类型筛选下拉选项 */
export const TYPE_OPTIONS = [
  { value: '', label: '全部类型' },
  { value: 'solution', label: '宏观方案' },
  { value: 'clientCase', label: '客户案例' },
  { value: 'capability', label: '能力储备' },
];

/** 排序选项 */
export const SORT_OPTIONS = [
  { value: 'date', label: '最新更新' },
  { value: 'name', label: '名称排序' },
];
