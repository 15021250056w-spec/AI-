/**
 * assetDetail.js — 资产详情打开器（可复用）
 *
 * 提供全局 openAssetDetail(id) 函数，调用方无需关心内部实现。
 * 当前实现：跳转至 /tool/browser?detail={id}，由列表检索页处理行内展开。
 * 后续如需变更打开方式，只需修改此函数，所有调用点无需改动。
 */

/**
 * 打开指定资产的详情。
 * 标签点击等场景调用此函数即可，无需知道详情如何展示。
 * @param {string} assetId
 */
export function openAssetDetail(assetId) {
  window.location.hash = `#/tool/browser?detail=${encodeURIComponent(assetId)}`;
}
