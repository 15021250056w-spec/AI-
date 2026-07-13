import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, RotateCcw } from 'lucide-react';
import { solutions } from '../../data/solutions';
import { getAllAssets, getAvailableSolutions, getAvailableIndustries } from '../../utils/assetFilter';
import { TYPE_LABEL, TYPE_OPTIONS, SORT_OPTIONS } from '../../data/labels';
import Tag from '../../components/Tag';
import type { AssetItem } from '../../utils/assetFilter';

/* ================================================================
 * 资产浏览器 — 级联筛选 + URL 同步
 * ================================================================ */

const SOLUTION_NAME_MAP = new Map(solutions.map(s => [s.id, s.nameZh]));

function getDisplaySolutionName(a: AssetItem): string {
  return a.belongSolutionName ?? SOLUTION_NAME_MAP.get(a.solutionBelongId) ?? '—';
}
function getDeliveryText(a: AssetItem): string {
  const forms = a.deliveryForm.filter(f => f !== '待补充');
  return forms.length ? forms.join(' / ') : '—';
}
function getTopBusinessLabels(limit: number): string[] {
  const freq = new Map<string, number>();
  for (const a of getAllAssets()) for (const l of a.businessLabels) freq.set(l, (freq.get(l) ?? 0) + 1);
  return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([l]) => l);
}

export default function Browser() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const readParams = useCallback(() => ({
    type: searchParams.get('type') ?? '',
    solution: searchParams.get('solution') ?? '',
    industry: searchParams.get('industry') ?? '',
    keyword: searchParams.get('keyword') ?? '',
    labels: new Set<string>(searchParams.get('labels')?.split(',').filter(Boolean) ?? []),
    sort: searchParams.get('sort') ?? 'date',
  }), [searchParams]);

  const [typeFilter, setTypeFilter] = useState(readParams().type);
  const [solutionFilter, setSolutionFilter] = useState(readParams().solution);
  const [industryFilter, setIndustryFilter] = useState(readParams().industry);
  const [keyword, setKeyword] = useState(readParams().keyword);
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(readParams().labels);
  const [sortBy, setSortBy] = useState(readParams().sort);

  const availableSolutions = useMemo(() => getAvailableSolutions(typeFilter, industryFilter), [typeFilter, industryFilter]);
  const availableIndustries = useMemo(() => getAvailableIndustries(typeFilter, solutionFilter), [typeFilter, solutionFilter]);
  const topLabels = useMemo(() => getTopBusinessLabels(10), []);

  useEffect(() => {
    if (solutionFilter && !availableSolutions.find(s => s.id === solutionFilter)) setSolutionFilter('');
  }, [availableSolutions, solutionFilter]);
  useEffect(() => {
    if (industryFilter && !availableIndustries.includes(industryFilter)) setIndustryFilter('');
  }, [availableIndustries, industryFilter]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (typeFilter) params.set('type', typeFilter);
    if (solutionFilter) params.set('solution', solutionFilter);
    if (industryFilter) params.set('industry', industryFilter);
    if (keyword) params.set('keyword', keyword);
    if (selectedLabels.size > 0) params.set('labels', [...selectedLabels].sort().join(','));
    if (sortBy !== 'date') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [typeFilter, solutionFilter, industryFilter, keyword, selectedLabels, sortBy, setSearchParams]);

  const filteredItems = useMemo(() => {
    const all = getAllAssets();
    const kw = keyword.trim().toLowerCase();
    let result = all.filter(a => {
      if (typeFilter && a.type !== typeFilter) return false;
      if (solutionFilter && a.solutionBelongId !== solutionFilter) return false;
      if (industryFilter && !a.industryList.includes(industryFilter)) return false;
      if (kw) { if (![a.nameZh, a.nameEn, a.shortDesc, ...a.businessLabels].join(' ').toLowerCase().includes(kw)) return false; }
      if (selectedLabels.size > 0 && !a.businessLabels.some(l => selectedLabels.has(l))) return false;
      return true;
    });
    if (sortBy === 'name') result = result.sort((a, b) => a.nameZh.localeCompare(b.nameZh, 'zh-CN'));
    else result = result.sort((a, b) => b.updateDate.localeCompare(a.updateDate));
    return result;
  }, [typeFilter, solutionFilter, industryFilter, keyword, selectedLabels, sortBy]);

  const toggleLabel = (label: string) => setSelectedLabels(prev => { const n = new Set(prev); n.has(label) ? n.delete(label) : n.add(label); return n; });
  const removeLabel = (label: string) => setSelectedLabels(prev => { const n = new Set(prev); n.delete(label); return n; });
  const resetAll = () => { setTypeFilter(''); setSolutionFilter(''); setIndustryFilter(''); setKeyword(''); setSelectedLabels(new Set()); setSortBy('date'); };
  const hasAnyFilter = !!(typeFilter || solutionFilter || industryFilter || keyword || selectedLabels.size > 0);

  const cardStyle: React.CSSProperties = {
    borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-page)' }}>
      {/* 筛选栏 — sticky top: 56px (ToolLayout height) */}
      <div style={{ position: 'sticky', top: '56px', zIndex: 50, background: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', padding: '12px 0' }}>
        <div style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '0 20px' }}>
          {/* Row 1: 下拉 + 搜索 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select className="filter-select" value={solutionFilter} onChange={e => setSolutionFilter(e.target.value)}>
              <option value="">全部方案</option>
              {availableSolutions.map(s => <option key={s.id} value={s.id}>{s.nameZh.length > 18 ? s.nameZh.slice(0, 18) + '…' : s.nameZh}</option>)}
            </select>
            <select className="filter-select" value={industryFilter} onChange={e => setIndustryFilter(e.target.value)}>
              <option value="">全部行业</option>
              {availableIndustries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
            <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', minWidth: '100px' }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div style={{ flex: 1, minWidth: 0 }} />
            <div style={{ position: 'relative', width: '240px' }}>
              <input type="text" placeholder="搜索名称、简介、标签…" className="search-input" value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: '100%', paddingRight: '30px' }} />
              <Search size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Row 2: 高频标签 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', flexShrink: 0 }}>高频标签（任一匹配）:</span>
            {topLabels.map(label => {
              const active = selectedLabels.has(label);
              return (
                <button key={label} onClick={() => toggleLabel(label)}
                  style={{ padding: '3px 10px', fontSize: '11px', borderRadius: '4px', border: active ? '1px solid var(--color-primary-light)' : '1px solid var(--color-border)', background: active ? 'var(--color-aux-1)' : '#fff', color: active ? 'var(--color-primary)' : 'var(--color-text-body)', cursor: 'pointer', fontWeight: active ? 500 : 400 }}
                >{label}</button>
              );
            })}
            {selectedLabels.size > 0 && (
              <button onClick={() => setSelectedLabels(new Set())} style={{ padding: '3px 8px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-muted)', cursor: 'pointer' }}>清除标签</button>
            )}
          </div>

          {/* Row 3: 已选筛选条件醒目汇总条 */}
          {hasAnyFilter && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', padding: '8px 12px', borderRadius: '6px', background: 'var(--color-aux-1)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', flexShrink: 0 }}>当前筛选：</span>
              {typeFilter && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: 'var(--color-text-body)' }}>
                  类型: {TYPE_LABEL[typeFilter]} <X size={11} style={{ cursor: 'pointer' }} onClick={() => setTypeFilter('')} />
                </span>
              )}
              {solutionFilter && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: 'var(--color-text-body)' }}>
                  方案: {SOLUTION_NAME_MAP.get(solutionFilter)?.slice(0, 12)} <X size={11} style={{ cursor: 'pointer' }} onClick={() => setSolutionFilter('')} />
                </span>
              )}
              {industryFilter && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: 'var(--color-text-body)' }}>
                  行业: {industryFilter} <X size={11} style={{ cursor: 'pointer' }} onClick={() => setIndustryFilter('')} />
                </span>
              )}
              {keyword && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: 'var(--color-text-body)' }}>
                  搜索: {keyword} <X size={11} style={{ cursor: 'pointer' }} onClick={() => setKeyword('')} />
                </span>
              )}
              {[...selectedLabels].map(l => (
                <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', fontSize: '11px', borderRadius: '4px', background: '#fff', color: 'var(--color-primary)' }}>
                  {l} <X size={11} style={{ cursor: 'pointer' }} onClick={() => removeLabel(l)} />
                </span>
              ))}
              <button onClick={resetAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-muted)', cursor: 'pointer', marginLeft: '4px' }}>
                <RotateCcw size={11} /> 全部清除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 结果区 */}
      <div style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '20px 20px 40px' }}>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          共 <strong style={{ color: 'var(--color-text-main)' }}>{filteredItems.length}</strong> 条资产
        </div>

        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--color-text-muted)' }}>
            <div style={{ fontSize: '44px', marginBottom: '16px', opacity: 0.25 }}>📭</div>
            <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>未找到匹配的资产</div>
            <div style={{ fontSize: '13px', marginBottom: '20px' }}>当前筛选条件下无结果，请尝试调整或重置筛选条件</div>
            {hasAnyFilter && (
              <button onClick={resetAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-body)', cursor: 'pointer', fontWeight: 500 }}>
                <RotateCcw size={14} /> 重置全部筛选
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filteredItems.map(a => {
              const routePath = a.type === 'solution' ? `/tool/solution/${a.id}` : `/tool/case/${a.id}`;
              return (
                <div key={a.id} onClick={() => navigate(routePath)}
                  style={{ padding: '16px', border: '1px solid var(--color-border-light)', background: 'var(--color-bg-card)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-color 0.1s', ...cardStyle }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
                >
                  <div><Tag variant={a.type} size="small">{TYPE_LABEL[a.type]}</Tag></div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.4 }}>{a.nameZh}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.3, minHeight: 14 }}>{a.nameEn}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-body)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>{a.shortDesc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border-light)', paddingTop: '8px' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{getDisplaySolutionName(a)}</span>
                    <span style={{ opacity: 0.4 }}>|</span>
                    <span style={{ flexShrink: 0 }}>{getDeliveryText(a)}</span>
                    <span style={{ opacity: 0.4 }}>|</span>
                    <span style={{ flexShrink: 0 }}>{a.updateDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
