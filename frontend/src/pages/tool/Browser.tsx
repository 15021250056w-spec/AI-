import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, RotateCcw, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { INDUSTRIES, SCENE_CATEGORIES } from '../../data/enums.js';
import { filterAssets, getAllBusinessLabels, getAllTechLabels, getCasesCountBySolutionId } from '../../utils/assetFilter.js';
import { useLang } from '../../i18n/context';
import InlineDetail from '../../components/tool/InlineDetail';

/* ================================================================
 * 类型 & 常量
 * ================================================================ */

interface AssetItem {
  id: string; type: string; nameZh: string; nameEn: string; shortDesc?: string;
  industry: string; sceneCategory: string; businessLabels: string[]; techLabels: string[];
  deliveryForm?: string; maturity?: string; detail?: string; regionLang?: string;
  solutionId?: string; solutionName?: string; client?: string; projectStatus?: string;
  projectBg?: string; effectData?: string; bu: string; contactName: string; contactEmail: string; updateDate: string;
}

const TAG_CLOUD_LIMIT = 15;
const TRUNCATE_LENGTH = 50;
const NARROW_BP = 992;

function getStatus(a: AssetItem) { return a.type === 'solution' ? (a.maturity || '—') : (a.projectStatus || '—'); }
function getDesc(a: AssetItem) {
  const txt = a.type === 'solution' ? a.shortDesc : a.projectBg;
  if (!txt) return '—';
  return txt.length > TRUNCATE_LENGTH ? txt.slice(0, TRUNCATE_LENGTH) + '…' : txt;
}

/** 把数组 join 成逗号分隔字符串，空数组返回空字符串（URL 中省略） */
function joinParam(arr: string[]) { return arr.length ? arr.join(',') : ''; }

/* ================================================================
 * 列表检索页
 * ================================================================ */

export default function Browser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang, dict, tEnum } = useLang();
  const expandedRowRef = useRef<HTMLTableRowElement | null>(null);
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < NARROW_BP);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onR = () => setIsNarrow(window.innerWidth < NARROW_BP);
    window.addEventListener('resize', onR); return () => window.removeEventListener('resize', onR);
  }, []);

  /* ---- URL 参数解析（多值逗号分隔） ---- */
  const types: string[] = (searchParams.get('type') || '').split(',').filter(Boolean);
  const industries: string[] = (searchParams.get('industry') || '').split(',').filter(Boolean);
  const sceneCategories: string[] = (searchParams.get('scene') || '').split(',').filter(Boolean);
  const businessLabels: string[] = (searchParams.get('blabels') || '').split(',').filter(Boolean);
  const techLabels: string[] = (searchParams.get('tlabels') || '').split(',').filter(Boolean);
  const keyword = searchParams.get('keyword') || '';
  const detailId = searchParams.get('detail') || '';
  const solutionFilter = searchParams.get('solution') || '';

  const [expandedId, setExpandedId] = useState<string | null>(detailId || null);
  const [bizExp, setBizExp] = useState(false);
  const [techExp, setTechExp] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allBizLabels = useMemo(() => getAllBusinessLabels(), []);
  const allTechLabels = useMemo(() => getAllTechLabels(), []);

  /* ---- 筛选 ---- */
  const baseResults: AssetItem[] = useMemo(() => {
    return sortByDate(filterAssets({
      types: types.length > 0 ? types : undefined,
      industries: industries.length > 0 ? industries : undefined,
      sceneCategories: sceneCategories.length > 0 ? sceneCategories : undefined,
      businessLabels: businessLabels.length > 0 ? businessLabels : undefined,
      techLabels: techLabels.length > 0 ? techLabels : undefined,
      keyword: keyword || undefined,
    }) as AssetItem[]);
  }, [types, industries, sceneCategories, businessLabels, techLabels, keyword]);

  // solutionFilter 二次过滤
  const filteredResults: AssetItem[] = useMemo(() => {
    if (!solutionFilter) return baseResults;
    return baseResults.filter(a => a.id === solutionFilter || a.solutionId === solutionFilter);
  }, [baseResults, solutionFilter]);

  /* ---- URL 同步 ---- */
  const updateParams = useCallback((upd: Record<string, string>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      for (const [k, v] of Object.entries(upd)) {
        if (v) next.set(k, v); else next.delete(k);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  /* ---- detail 参数 ---- */
  useEffect(() => {
    if (!detailId) { setExpandedId(null); return; }
    const found = filteredResults.find(r => r.id === detailId);
    if (!found) {
      setSearchParams({ detail: detailId }, { replace: true });
      setExpandedId(detailId); return;
    }
    setExpandedId(detailId);
  }, [detailId]); // eslint-disable-line

  useEffect(() => {
    if (expandedId && expandedRowRef.current) {
      requestAnimationFrame(() => expandedRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  }, [expandedId]);

  /* ---- 筛选操作 ---- */
  const setTypes = useCallback((arr: string[]) => {
    updateParams({ type: joinParam(arr), detail: '' });
    setExpandedId(null);
  }, [updateParams]);

  const toggleIndustry = useCallback((v: string) => {
    const next = industries.includes(v) ? industries.filter(i => i !== v) : [...industries, v];
    updateParams({ industry: joinParam(next), detail: '' });
    setExpandedId(null);
  }, [industries, updateParams]);

  const toggleScene = useCallback((v: string) => {
    const next = sceneCategories.includes(v) ? sceneCategories.filter(s => s !== v) : [...sceneCategories, v];
    updateParams({ scene: joinParam(next), detail: '' });
    setExpandedId(null);
  }, [sceneCategories, updateParams]);

  const toggleBiz = useCallback((l: string) => {
    const next = businessLabels.includes(l) ? businessLabels.filter(x => x !== l) : [...businessLabels, l];
    updateParams({ blabels: joinParam(next), detail: '' });
    setExpandedId(null);
  }, [businessLabels, updateParams]);

  const toggleTech = useCallback((l: string) => {
    const next = techLabels.includes(l) ? techLabels.filter(x => x !== l) : [...techLabels, l];
    updateParams({ tlabels: joinParam(next), detail: '' });
    setExpandedId(null);
  }, [techLabels, updateParams]);

  const setKw = useCallback((kw: string) => {
    updateParams({ keyword: kw, detail: '' });
    setExpandedId(null);
  }, [updateParams]);

  const setSolutionFilter = useCallback((sid: string) => {
    updateParams({ solution: sid, industry: '', scene: '', detail: '' });
    setExpandedId(null);
  }, [updateParams]);

  const clearSolutionFilter = useCallback(() => {
    updateParams({ solution: '' });
  }, [updateParams]);

  const resetAll = useCallback(() => {
    setSearchParams({}, { replace: true });
    setExpandedId(null); setBizExp(false); setTechExp(false); setDrawerOpen(false);
  }, [setSearchParams]);

  const handleRowClick = useCallback((id: string) => {
    if (expandedId === id) { setExpandedId(null); updateParams({ detail: '' }); }
    else { setExpandedId(id); updateParams({ detail: id }); }
  }, [expandedId, updateParams]);

  const copyLink = useCallback((id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/tool/browser?detail=${encodeURIComponent(id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }).catch(() => {
      const ta = document.createElement('textarea'); ta.value = url;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }, []);

  const handleAssetClick = useCallback((id: string) => {
    setExpandedId(id); updateParams({ detail: id });
  }, [updateParams]);

  const handleInlineTagClick = useCallback((group: 'business' | 'tech', label: string) => {
    if (group === 'business') {
      if (!businessLabels.includes(label)) {
        updateParams({ blabels: joinParam([...businessLabels, label]), detail: '' });
      }
    } else {
      if (!techLabels.includes(label)) {
        updateParams({ tlabels: joinParam([...techLabels, label]), detail: '' });
      }
    }
    setExpandedId(null);
  }, [businessLabels, techLabels, updateParams]);

  const hasAnyFilter = !!(types.length > 0 || industries.length > 0 || sceneCategories.length > 0 || businessLabels.length > 0 || techLabels.length > 0 || keyword || solutionFilter);

  // 类型标签显示名称
  const tLabel = (t: string) => t === 'solution' ? dict.labelSolution : dict.labelCase;
  const isTypeAll = types.length === 0 || types.length === 2;

  /* ---- 翻译选项 ---- */
  const industryTags = useMemo(() => INDUSTRIES.map(i => ({ value: i, label: tEnum('INDUSTRIES', i) })), [tEnum]);
  const sceneTags = useMemo(() => SCENE_CATEGORIES.map(s => ({ value: s, label: tEnum('SCENE_CATEGORIES', s) })), [tEnum]);

  /* ================================================================
   * 筛选面板
   * ================================================================ */

  const filterPanel = (
    <div style={{ padding: '16px' }}>
      {/* 资产类型 — 3 pill */}
      <FilterGroup title={dict.filterType}>
        <div style={{ display: 'flex' }}>
          <span style={{ borderRadius: '4px 0 0 4px', overflow: 'hidden' }}><PillBtn active={isTypeAll} onClick={() => setTypes([])}>{dict.typeAll}</PillBtn></span>
          <span style={{ overflow: 'hidden' }}><PillBtn active={types.includes('solution') && !isTypeAll} onClick={() => setTypes(types.includes('solution') ? types.filter(t => t !== 'solution') : ['solution'])}>{dict.typeSolution}</PillBtn></span>
          <span style={{ borderRadius: '0 4px 4px 0', overflow: 'hidden' }}><PillBtn active={types.includes('case') && !isTypeAll} onClick={() => setTypes(types.includes('case') ? types.filter(t => t !== 'case') : ['case'])}>{dict.typeCase}</PillBtn></span>
        </div>
      </FilterGroup>

      {/* 目标行业 — 标签云 */}
      <FilterGroup title={`${dict.filterIndustry}${industries.length ? ` (${industries.length})` : ''}`}>
        <MultiTagCloud tags={industryTags} selected={industries} onToggle={toggleIndustry} />
      </FilterGroup>

      {/* 场景分类 — 标签云 */}
      <FilterGroup title={`${dict.filterScene}${sceneCategories.length ? ` (${sceneCategories.length})` : ''}`}>
        <MultiTagCloud tags={sceneTags} selected={sceneCategories} onToggle={toggleScene} />
      </FilterGroup>

      {/* 业务标签 — 带折叠 */}
      <FilterGroup title={`${dict.filterBizLabels(allBizLabels.length)}${businessLabels.length ? ` (${businessLabels.length})` : ''}`}>
        <TagCloud labels={allBizLabels} selected={businessLabels} onToggle={toggleBiz} expanded={bizExp} onToggleExpand={() => setBizExp(e => !e)} dict={dict} />
      </FilterGroup>

      {/* 技术标签 — 带折叠 */}
      <FilterGroup title={`${dict.filterTechLabels(allTechLabels.length)}${techLabels.length ? ` (${techLabels.length})` : ''}`}>
        <TagCloud labels={allTechLabels} selected={techLabels} onToggle={toggleTech} expanded={techExp} onToggleExpand={() => setTechExp(e => !e)} dict={dict} />
      </FilterGroup>

      {/* 底部重置 */}
      <button onClick={resetAll} style={resetBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.color = '#86909C'; }}
      ><RotateCcw size={12} /> {dict.resetAll}</button>
    </div>
  );

  /* ================================================================
   * 主渲染
   * ================================================================ */

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 48px)', background: '#F5F7FA' }}>
      {!isNarrow && (
        <aside style={{ width: '248px', flexShrink: 0, background: '#fff', borderRight: '1px solid #E5E6EB', overflowY: 'auto', maxHeight: 'calc(100vh - 48px)', position: 'sticky', top: '48px' }}>
          {filterPanel}
        </aside>
      )}
      {isNarrow && drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,0.3)' }} />
          <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', maxWidth: '85vw', zIndex: 151, background: '#fff', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #E5E6EB' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1D2129' }}>{dict.filterBtn}</span>
              <button onClick={() => setDrawerOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#86909C', fontSize: '18px', padding: '4px' }}>✕</button>
            </div>
            {filterPanel}
          </aside>
        </>
      )}

      <div style={{ flex: 1, minWidth: 0, padding: '20px 24px 48px' }}>
        {/* 搜索 + 计数 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {isNarrow && (
            <button onClick={() => setDrawerOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '13px', borderRadius: '4px', border: '1px solid #E5E6EB', background: '#fff', color: '#4E5969', cursor: 'pointer', fontWeight: 500 }}>
              <SlidersHorizontal size={14} /> {dict.filterBtn}
            </button>
          )}
          <div style={{ position: 'relative', flex: 1, maxWidth: '360px', minWidth: '180px' }}>
            <input type="text" placeholder={dict.searchPlaceholder} value={keyword}
              onChange={e => setKw(e.target.value)}
              style={{ width: '100%', padding: '9px 36px 9px 14px', fontSize: '14px', borderRadius: '6px', border: '1px solid #E5E6EB', outline: 'none', background: '#fff', color: '#1D2129', lineHeight: 1.5, transition: 'box-shadow 0.15s' }}
              onFocus={e => { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(22,93,255,0.12)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {keyword ? (
              <X size={14} onClick={() => setKw('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#86909C', cursor: 'pointer' }} />
            ) : (
              <Search size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#86909C', pointerEvents: 'none' }} />
            )}
          </div>
          <span style={{ fontSize: '14px', color: '#86909C', whiteSpace: 'nowrap', lineHeight: 1.5 }}>{dict.resultCount(filteredResults.length)}</span>
        </div>

        {/* solutionFilter 提示条 */}
        {solutionFilter && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '8px 12px', borderRadius: '4px', background: '#E8F0FE', fontSize: '13px', color: '#165DFF' }}>
            <span style={{ fontWeight: 500 }}>Showing results for solution: {solutionFilter}</span>
            <button onClick={clearSolutionFilter} style={{ border: 'none', background: 'transparent', color: '#165DFF', cursor: 'pointer', fontWeight: 600, fontSize: '13px', padding: '2px 8px' }}>✕ Clear</button>
          </div>
        )}

        {/* 筛选条件汇总条 */}
        {hasAnyFilter && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', padding: '8px 12px', borderRadius: '4px', background: '#E8F0FE' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#165DFF', flexShrink: 0 }}>{dict.currentFilter}</span>
            {types.map(t => <Chip key={t} label={tLabel(t)} onRemove={() => setTypes(types.filter(x => x !== t))} />)}
            {industries.map(i => <Chip key={i} label={tEnum('INDUSTRIES', i)} onRemove={() => toggleIndustry(i)} />)}
            {sceneCategories.map(s => <Chip key={s} label={tEnum('SCENE_CATEGORIES', s)} onRemove={() => toggleScene(s)} />)}
            {keyword && <Chip label={`"${keyword}"`} onRemove={() => setKw('')} />}
            {businessLabels.map(l => <Chip key={l} label={l} hl onRemove={() => toggleBiz(l)} />)}
            {techLabels.map(l => <Chip key={l} label={l} hl onRemove={() => toggleTech(l)} />)}
            <button onClick={resetAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid #E5E6EB', background: '#fff', color: '#86909C', cursor: 'pointer', marginLeft: '4px' }}>
              <RotateCcw size={11} /> {dict.clearAll}
            </button>
          </div>
        )}

        {/* 表格 */}
        {filteredResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '4px', border: '1px solid #E5E6EB', lineHeight: 1.5 }}>
            <div style={{ fontSize: '44px', marginBottom: '16px', opacity: 0.25 }}>📭</div>
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#4E5969', marginBottom: '6px' }}>{dict.emptyTitle}</div>
            <div style={{ fontSize: '14px', color: '#86909C', marginBottom: '20px' }}>{dict.emptyDesc}</div>
            {hasAnyFilter && <button onClick={resetAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '14px', borderRadius: '4px', border: '1px solid #E5E6EB', background: '#fff', color: '#4E5969', cursor: 'pointer', fontWeight: 500 }}><RotateCcw size={14} /> {dict.resetAll}</button>}
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid #E5E6EB', borderRadius: '4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', fontSize: '14px', lineHeight: 1.5, minWidth: '720px' }}>
              <thead>
                <tr>
                  <th style={thS} />
                  <th style={{ ...thS, minWidth: '200px' }}>{dict.colName}</th>
                  <th style={{ ...thS, minWidth: '180px' }}>{dict.colSummary}</th>
                  <th style={{ ...thS, width: '150px' }}>行业 / 场景</th>
                  <th style={{ ...thS, width: '130px' }}>{dict.colStatus}</th>
                  <th style={{ ...thS, width: '100px' }}>{dict.colUpdateDate}</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(asset => {
                  const isExpanded = expandedId === asset.id;
                  const isSol = asset.type === 'solution';
                  const dn = lang === 'zh' ? asset.nameZh : asset.nameEn;
                  const ds = lang === 'zh' ? asset.nameEn : asset.nameZh;
                  const caseCount = isSol ? getCasesCountBySolutionId(asset.id) : 0;

                  return (
                    <React.Fragment key={asset.id}>
                      {/* 数据行 */}
                      <tr onClick={() => handleRowClick(asset.id)}
                        style={{ cursor: 'pointer', background: isExpanded ? '#F0F4FA' : '#fff', borderBottom: '1px solid #E5E6EB', transition: 'background-color 150ms ease' }}
                        onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = '#F7F8FA'; }}
                        onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = '#fff'; }}
                      >
                        <td style={{ ...tdS, width: '36px', textAlign: 'center', padding: '8px 4px 8px 12px' }}>
                          <span style={{ display: 'inline-block', transition: 'transform 200ms', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            <ChevronRight size={14} color={isExpanded ? '#165DFF' : '#C7CDD1'} />
                          </span>
                        </td>
                        <td style={{ ...tdS }}>
                          <span style={{ display: 'inline-block', padding: '2px 10px', fontSize: '11px', fontWeight: 500, borderRadius: '4px', background: isSol ? '#165DFF' : '#00B42A', color: '#fff', marginRight: '8px', verticalAlign: 'middle' }}>{tLabel(asset.type)}</span>
                          <span style={{ fontWeight: 600, color: '#1D2129' }}>{dn}</span>
                          <div style={{ fontSize: '11px', color: '#B0B5BF', marginTop: '2px' }}>
                            {ds}
                            {isSol && caseCount > 0 && (
                              <span onClick={e => { e.stopPropagation(); setSolutionFilter(asset.id); }}
                                style={{ color: '#165DFF', cursor: 'pointer', marginLeft: '6px', fontWeight: 500 }}
                                title={dict.relatedCaseCount(caseCount)}
                              > · {dict.relatedCaseCount(caseCount)}</span>
                            )}
                            {!isSol && asset.solutionName && (
                              <span onClick={e => { e.stopPropagation(); setSolutionFilter(asset.solutionId!); }}
                                style={{ color: '#165DFF', cursor: 'pointer', marginLeft: '6px', fontWeight: 500 }}
                                title={dict.belongsTo(asset.solutionName)}
                              > · {dict.belongsTo(asset.solutionName)}</span>
                            )}
                          </div>
                        </td>
                        <td style={{ ...tdS, color: '#86909C', fontSize: '13px' }}>{getDesc(asset)}</td>
                        <td style={{ ...tdS, fontSize: '12px', lineHeight: 1.6 }}>
                          <div>{tEnum('INDUSTRIES', asset.industry)}</div>
                          <div style={{ color: '#86909C' }}>{tEnum('SCENE_CATEGORIES', asset.sceneCategory)}</div>
                        </td>
                        <td style={{ ...tdS, fontSize: '12px' }}>
                          <span style={{ display: 'inline-block', padding: '1px 6px', fontSize: '11px', borderRadius: '4px', background: '#F0F2F5', color: '#4E5969' }}>{isSol ? tEnum('MATURITY_LEVELS', getStatus(asset)) : tEnum('PROJECT_STATUS', getStatus(asset))}</span>
                        </td>
                        <td style={{ ...tdS, color: '#86909C', fontSize: '13px' }}>{asset.updateDate}</td>
                      </tr>

                      {/* 展开详情行 */}
                      {isExpanded && (
                        <tr ref={expandedRowRef}>
                          <td colSpan={6} style={{ padding: 0, borderBottom: '1px solid #E5E6EB' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', maxHeight: '2000px', opacity: 1 }}>
                              <InlineDetail
                                asset={asset}
                                onTagClick={handleInlineTagClick}
                                onAssetClick={handleAssetClick}
                                onCopyLink={() => copyLink(asset.id)}
                                onClose={() => handleRowClick(asset.id)}
                                copied={copiedId === asset.id}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
 * 子组件
 * ================================================================ */

const resetBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '12px', borderRadius: '4px',
  border: '1px solid #E5E6EB', background: '#fff', color: '#86909C', cursor: 'pointer', fontWeight: 500,
};

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#86909C', marginBottom: '6px', paddingBottom: '6px', borderBottom: '1px solid #F0F2F5' }}>{title}</div>
      {children}
    </div>
  );
}

/** Pill 按钮（资产类型）— segmented 风格 */
function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 16px', fontSize: '12px', fontWeight: active ? 600 : 400, borderRadius: '0',
      border: active ? '1px solid #165DFF' : '1px solid #E5E6EB',
      background: active ? '#E8F0FE' : '#fff', color: active ? '#165DFF' : '#4E5969',
      cursor: 'pointer', transition: 'all 150ms ease', marginLeft: '-1px',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F5F7FA'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = '#fff'; }}
    >
      {children}
    </button>
  );
}

/** 全量展示的标签云（不折叠） */
function MultiTagCloud({ tags, selected, onToggle }: { tags: { value: string; label: string }[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {tags.map(t => {
        const a = selected.includes(t.value);
        return (
          <span key={t.value} onClick={() => onToggle(t.value)}
            style={{
              display: 'inline-block', padding: '4px 10px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', userSelect: 'none',
              fontWeight: a ? 600 : 400, border: a ? '1px solid #165DFF' : '1px solid #E5E6EB',
              background: a ? '#E8F0FE' : '#FAFBFC', color: a ? '#165DFF' : '#4E5969',
              transition: 'transform 100ms',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; if (!a) { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.color = '#4E5969'; } }}
            onMouseEnter={e => { if (!a) { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; } }}
          >{t.label}</span>
        );
      })}
    </div>
  );
}

/** 折叠式标签云（业务/技术标签用） */
function TagCloud({ labels, selected, onToggle, expanded, onToggleExpand, dict }: {
  labels: string[]; selected: string[]; onToggle: (l: string) => void;
  expanded: boolean; onToggleExpand: () => void;
  dict: { expandMore: (n: number) => string; collapse: string; noLabels: string };
}) {
  const visible = expanded ? labels : labels.slice(0, TAG_CLOUD_LIMIT);
  const more = labels.length > TAG_CLOUD_LIMIT;
  if (!labels.length) return <span style={{ fontSize: '12px', color: '#C7CDD1' }}>{dict.noLabels}</span>;
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {visible.map(l => {
          const a = selected.includes(l);
          return (
            <span key={l} onClick={() => onToggle(l)}
              style={{
                display: 'inline-block', padding: '4px 10px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', userSelect: 'none',
                fontWeight: a ? 600 : 400, border: a ? '1px solid #165DFF' : '1px solid #E5E6EB',
                background: a ? '#E8F0FE' : '#FAFBFC', color: a ? '#165DFF' : '#4E5969',
                transition: 'transform 100ms',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; if (!a) { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.color = '#4E5969'; } }}
              onMouseEnter={e => { if (!a) { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; } }}
            >{l}</span>
          );
        })}
      </div>
      {more && (
        <span onClick={onToggleExpand} style={{ display: 'inline-block', marginTop: '6px', fontSize: '11px', color: '#165DFF', cursor: 'pointer', fontWeight: 500 }}>
          {expanded ? dict.collapse : dict.expandMore(labels.length - TAG_CLOUD_LIMIT)}
        </span>
      )}
    </div>
  );
}

function Chip({ label, hl, onRemove }: { label: string; hl?: boolean; onRemove: () => void }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: hl ? '#165DFF' : '#4E5969', fontWeight: hl ? 600 : 400 }}>
      {label} <X size={11} style={{ cursor: 'pointer' }} onClick={onRemove} />
    </span>
  );
}

function sortByDate(arr: AssetItem[]) { return [...arr].sort((a, b) => b.updateDate.localeCompare(a.updateDate)); }

const thS: React.CSSProperties = { padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#86909C', background: '#F7F8FA', borderBottom: '1px solid #E5E6EB', textAlign: 'left', whiteSpace: 'nowrap', lineHeight: 1.5 };
const tdS: React.CSSProperties = { padding: '8px 12px', fontSize: '14px', borderBottom: '1px solid #E5E6EB', lineHeight: 1.5 };
