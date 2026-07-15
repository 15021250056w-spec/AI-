/**
 * assetFilter.js — 资产筛选通用工具函数
 *
 * 提供对 solutions + cases 全量资产的聚合查询与筛选能力，
 * 供矩阵总览、列表检索等页面复用，保证筛选口径统一。
 */

import { solutions } from '../data/solutions.js';
import { cases } from '../data/cases.js';

/* ================================================================
 * 基础查询
 * ================================================================ */

/**
 * getAllAssets()
 * 返回方案 + 案例的合并数组（全量资产）。
 * @returns {Array<object>}
 */
export function getAllAssets() {
  return [...solutions, ...cases];
}

/**
 * getCasesBySolutionId(solutionId)
 * 返回某方案下所有案例。
 * @param {string} solutionId
 * @returns {Array<object>}
 */
export function getCasesBySolutionId(solutionId) {
  return cases.filter(c => c.solutionId === solutionId);
}

/**
 * getCasesCountBySolutionId(solutionId)
 * 返回某方案关联的案例数量。
 * @param {string} solutionId
 * @returns {number}
 */
export function getCasesCountBySolutionId(solutionId) {
  return cases.filter(c => c.solutionId === solutionId).length;
}

/**
 * getSolutionById(id)
 * @param {string} id
 * @returns {object|undefined}
 */
export function getSolutionById(id) {
  return solutions.find(s => s.id === id);
}

/**
 * getCaseById(id)
 * @param {string} id
 * @returns {object|undefined}
 */
export function getCaseById(id) {
  return cases.find(c => c.id === id);
}

/**
 * getAssetById(id)
 * 先从方案中查找，未找到再从案例中查找。
 * @param {string} id
 * @returns {object|undefined}
 */
export function getAssetById(id) {
  return getSolutionById(id) ?? getCaseById(id);
}

/* ================================================================
 * 标签聚合
 * ================================================================ */

/**
 * getAllBusinessLabels()
 * 从全量数据动态聚合去重所有业务标签。
 * @returns {string[]}
 */
export function getAllBusinessLabels() {
  const labels = new Set();
  for (const asset of getAllAssets()) {
    for (const label of asset.businessLabels) {
      labels.add(label);
    }
  }
  return [...labels].sort();
}

/**
 * getAllTechLabels()
 * 从全量数据动态聚合去重所有技术标签。
 * @returns {string[]}
 */
export function getAllTechLabels() {
  const labels = new Set();
  for (const asset of getAllAssets()) {
    for (const label of asset.techLabels) {
      labels.add(label);
    }
  }
  return [...labels].sort();
}

/* ================================================================
 * 组合筛选
 * ================================================================ */

/**
 * filterAssets({ types, industries, sceneCategories, businessLabels, techLabels, keyword })
 *
 * 筛选规则：
 * - types / industries / sceneCategories / businessLabels / techLabels
 *   五组之间为 AND 关系；每组内部为 OR 关系（命中任一即匹配）
 * - 所有数组参数：传空数组或 undefined 表示不筛选该维度
 * - keyword 模糊匹配 nameZh、nameEn、shortDesc、businessLabels、techLabels
 *   五个字段（案例没有 shortDesc 则跳过该字段），不区分大小写
 * - 不匹配 detail、projectBg、effectData 等长文本字段
 *
 * @param {object} filters
 * @param {string[]} [filters.types]           - ['solution', 'case']，空数组=不筛选
 * @param {string[]} [filters.industries]      - 行业值数组，空数组=不筛选
 * @param {string[]} [filters.sceneCategories] - 场景分类值数组，空数组=不筛选
 * @param {string[]} [filters.businessLabels]  - 业务标签（OR）
 * @param {string[]} [filters.techLabels]      - 技术标签（OR）
 * @param {string}   [filters.keyword]         - 关键词
 * @returns {Array<object>}
 */
export function filterAssets({ types, industries, sceneCategories, businessLabels, techLabels, keyword } = {}) {
  const all = getAllAssets();
  const kw = keyword?.trim().toLowerCase() ?? '';

  // 标准化数组参数
  const typeArr = types?.length ? types : null;
  const industryArr = industries?.length ? industries : null;
  const sceneArr = sceneCategories?.length ? sceneCategories : null;
  const bizArr = businessLabels?.length ? businessLabels : null;
  const techArr = techLabels?.length ? techLabels : null;

  return all.filter(asset => {
    // 类型筛选（OR）
    if (typeArr && !typeArr.includes(asset.type)) return false;

    // 行业筛选（OR）
    if (industryArr && !industryArr.includes(asset.industry)) return false;

    // 场景分类筛选（OR）
    if (sceneArr && !sceneArr.includes(asset.sceneCategory)) return false;

    // 业务标签筛选（OR）
    if (bizArr) {
      const hit = bizArr.some(l => asset.businessLabels.includes(l));
      if (!hit) return false;
    }

    // 技术标签筛选（OR）
    if (techArr) {
      const hit = techArr.some(l => asset.techLabels.includes(l));
      if (!hit) return false;
    }

    // 关键词模糊匹配（不区分大小写）
    if (kw) {
      const searchFields = [
        asset.nameZh,
        asset.nameEn,
        asset.shortDesc,
        ...asset.businessLabels,
        ...asset.techLabels,
      ].filter(Boolean);

      const searchText = searchFields.join(' ').toLowerCase();
      if (!searchText.includes(kw)) return false;
    }

    return true;
  });
}

/* ================================================================
 * 排序
 * ================================================================ */

/**
 * sortByUpdateDate(assets)
 * 按 updateDate 倒序排列（最新在前）。
 * @param {Array<object>} assets
 * @returns {Array<object>}
 */
export function sortByUpdateDate(assets) {
  return [...assets].sort((a, b) => b.updateDate.localeCompare(a.updateDate));
}
