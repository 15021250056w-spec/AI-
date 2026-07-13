/**
 * assetFilter.ts — 资产筛选通用工具函数
 *
 * 本文件提供对 solutions + cases 全量资产的聚合查询与筛选能力，
 * 供各页面（矩阵、浏览器、详情等）复用，保证筛选口径统一。
 */

import { solutions } from '../data/solutions';
import { cases } from '../data/cases';
import type { Solution } from '../data/solutions';
import type { Case } from '../data/cases';

/** 统一资产条目（联合类型，用于聚合遍历） */
export type AssetItem = Solution | Case;

/** 筛选条件对象 */
export interface AssetFilters {
  /** 按资产类型筛选 */
  type?: 'solution' | 'clientCase' | 'capability';
  /** 按归属方案ID筛选（级联筛选） */
  solutionBelongId?: string;
  /** 按目标行业筛选 */
  industry?: string;
  /** 按关键词搜索（名称/描述/标签） */
  keyword?: string;
}

/**
 * 获取全量资产（solutions + cases）的合并列表
 */
export function getAllAssets(): AssetItem[] {
  return [...solutions, ...cases];
}

/**
 * getAllIndustries()
 * 从全量资产（solutions + cases）中聚合去重所有目标行业，返回行业字符串数组
 */
export function getAllIndustries(): string[] {
  const industries = new Set<string>();
  const all = getAllAssets();
  for (const item of all) {
    for (const industry of item.industryList) {
      industries.add(industry);
    }
  }
  return Array.from(industries).sort();
}

/**
 * getSolutionsByIndustry(industry)
 * 传入行业名称，返回包含该行业的所有方案
 */
export function getSolutionsByIndustry(industry: string): Solution[] {
  return solutions.filter(sol =>
    sol.industryList.includes(industry)
  );
}

/**
 * getCasesByFilter(filters)
 * 传入筛选条件对象，返回匹配的方案或案例列表（统一返回 AssetItem[]）
 *
 * 支持多条件组合筛选：
 * - type: 按资产类型筛选
 * - solutionBelongId: 按归属方案ID级联筛选
 * - industry: 按目标行业筛选
 * - keyword: 模糊匹配名称、描述、业务标签、技术标签
 */
export function getCasesByFilter(filters: AssetFilters): AssetItem[] {
  const all = getAllAssets();
  const { type, solutionBelongId, industry, keyword } = filters;
  const kw = keyword?.trim().toLowerCase() ?? '';

  return all.filter(item => {
    // 按资产类型筛选
    if (type && item.type !== type) return false;

    // 按归属方案ID筛选
    if (solutionBelongId && item.solutionBelongId !== solutionBelongId) return false;

    // 按目标行业筛选
    if (industry && !item.industryList.includes(industry)) return false;

    // 关键词模糊搜索
    if (kw) {
      const searchText = [
        item.nameZh,
        item.nameEn,
        item.shortDesc,
        ...item.businessLabels,
        ...item.techLabels,
        ...item.industryList,
      ].join(' ').toLowerCase();

      if (!searchText.includes(kw)) return false;
    }

    return true;
  });
}

/**
 * getAllBusinessLabels()
 * 聚合全量资产的业务标签，去重并排序返回
 */
export function getAllBusinessLabels(): string[] {
  const labels = new Set<string>();
  const all = getAllAssets();
  for (const item of all) {
    for (const label of item.businessLabels) {
      labels.add(label);
    }
  }
  return Array.from(labels).sort();
}

/* ================================================================
 * 级联筛选辅助函数
 * 用于下拉列表联动：「选行业后无关方案自动隐藏」
 * ================================================================ */

/**
 * getAvailableSolutions(type, industry)
 * 根据当前已选的资产类型和目标行业，返回可用的方案列表。
 *
 * 级联规则：
 * - 若选中行业 → 只返回该行业下存在资产的方案
 * - 若选中非 solution 类型 → 只返回拥有该类型资产的方案
 * - 两者叠加取交集
 *
 * @param type  当前资产类型筛选（空字符串 = 不限）
 * @param industry  当前目标行业筛选（空字符串 = 不限）
 */
export function getAvailableSolutions(type: string, industry: string): Solution[] {
  if (!type && !industry) return solutions;

  return solutions.filter(sol => {
    // 收集该方案下的所有资产（方案自身 + 归属案例）
    const myAssets = getAllAssets().filter(a => a.solutionBelongId === sol.id);

    // 按类型筛选
    if (type) {
      const hasTypeMatch = myAssets.some(a => a.type === type);
      if (!hasTypeMatch) return false;
    }

    // 按行业筛选
    if (industry) {
      const hasIndustryMatch = myAssets.some(a => a.industryList.includes(industry));
      if (!hasIndustryMatch) return false;
    }

    return true;
  });
}

/**
 * getAvailableIndustries(type, solutionId)
 * 根据当前已选的资产类型和归属方案，返回可用的行业列表。
 *
 * 级联规则：
 * - 若选中方案 → 只返回该方案及下属案例覆盖的行业
 * - 若选中非 solution 类型 → 只返回拥有该类型资产的行业
 * - 两者叠加取交集
 *
 * @param type  当前资产类型筛选（空字符串 = 不限）
 * @param solutionId  当前所属方案筛选（空字符串 = 不限）
 */
export function getAvailableIndustries(type: string, solutionId: string): string[] {
  const allIndustries = getAllIndustries();

  if (!type && !solutionId) return allIndustries;

  return allIndustries.filter(ind => {
    const matchingAssets = getAllAssets().filter(a => {
      // 按方案限定范围
      if (solutionId && a.solutionBelongId !== solutionId) return false;
      // 按类型限定范围
      if (type && a.type !== type) return false;
      return true;
    });

    return matchingAssets.some(a => a.industryList.includes(ind));
  });
}
