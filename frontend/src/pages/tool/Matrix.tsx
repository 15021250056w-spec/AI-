import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../../data/solutions.js';
import { cases } from '../../data/cases.js';
import { MATRIX_INDUSTRIES, SCENE_CATEGORIES } from '../../data/enums.js';
import { openAssetDetail } from '../../utils/assetDetail.js';
import { useLang } from '../../i18n/context';

/* ================================================================
 * 类型
 * ================================================================ */

interface AssetItem {
  id: string; type: string; nameZh: string; nameEn: string; shortDesc?: string;
  industry: string; sceneCategory: string; businessLabels: string[]; techLabels: string[];
  deliveryForm?: string; maturity?: string; detail?: string; regionLang?: string;
  solutionId?: string; solutionName?: string; client?: string; projectStatus?: string;
  projectBg?: string; effectData?: string; bu: string; contactName: string; contactEmail: string; updateDate: string;
}

type CellMap = Record<string, AssetItem[]>;
type SolutionColorMap = Record<string, string>;

/* ================================================================
 * 常量
 * ================================================================ */

const SOLUTION_COLORS = ['#165DFF','#0FC6C2','#FF7D00','#F53F3F','#722ED1','#14C9C9','#F7BA1E','#00B42A','#3491FA','#9FDB1D','#F5319D','#7B61FF'];
const FALLBACK_COLOR = '#86909C';
const MAX_VISIBLE_TAGS = 5;
const NAME_MAX_LEN = 14;

/* ================================================================
 * 辅助
 * ================================================================ */

const matrixCases: AssetItem[] = (cases as AssetItem[]).filter(c => c.industry !== '通用/跨行业');
const matrixSolutions: AssetItem[] = (solutions as AssetItem[]).filter(s => s.industry !== '通用/跨行业');

function ck(scene: string, industry: string) { return `${scene}|${industry}`; }
function buildCaseMap(): CellMap { const m: CellMap = {}; for (const c of matrixCases) { const k = ck(c.sceneCategory, c.industry); if (!m[k]) m[k] = []; m[k].push(c); } return m; }
function buildSolutionMap(): CellMap { const m: CellMap = {}; for (const s of matrixSolutions) { const k = ck(s.sceneCategory, s.industry); if (!m[k]) m[k] = []; m[k].push(s); } return m; }
function getLegendSolutions(): AssetItem[] { const ids = new Set(matrixCases.map(c => c.solutionId)); return (solutions as AssetItem[]).filter(s => ids.has(s.id)); }
function buildSolutionColorMap(list: AssetItem[]): SolutionColorMap { const m: SolutionColorMap = {}; list.forEach((s, i) => { m[s.id] = i < SOLUTION_COLORS.length ? SOLUTION_COLORS[i] : FALLBACK_COLOR; }); return m; }
function getLatestDate(): string { let d = ''; for (const s of solutions as AssetItem[]) { if (s.updateDate > d) d = s.updateDate; } for (const c of cases as AssetItem[]) { if (c.updateDate > d) d = c.updateDate; } return d; }
function trunc(s: string, max: number) { return s.length > max ? s.slice(0, max) + '…' : s; }

/* ================================================================
 * 矩阵总览页
 * ================================================================ */

export default function Matrix() {
  const nav = useNavigate();
  const { lang, dict, tEnum } = useLang();
  const [mode, setMode] = useState<string>('case');
  const [hl, setHl] = useState<string | null>(null);

  const caseMap = useMemo(buildCaseMap, []);
  const solMap = useMemo(buildSolutionMap, []);
  const legend = useMemo(getLegendSolutions, []);
  const colorMap = useMemo(() => buildSolutionColorMap(legend), [legend]);
  const latest = useMemo(getLatestDate, []);
  const sc = (solutions as AssetItem[]).length;
  const cc = (cases as AssetItem[]).length;

  const toggleHl = useCallback((id: string) => setHl(p => p === id ? null : id), []);
  const tagClick = useCallback((e: React.MouseEvent, id: string) => { e.stopPropagation(); openAssetDetail(id); }, []);
  const viewAll = useCallback((e: React.MouseEvent, ind: string, scn: string) => { e.stopPropagation(); nav(`/tool/browser?industry=${encodeURIComponent(ind)}&scene=${encodeURIComponent(scn)}`); }, [nav]);

  const dInd = useMemo(() => MATRIX_INDUSTRIES.map(i => tEnum('INDUSTRIES', i)), [tEnum]);
  const dScn = useMemo(() => SCENE_CATEGORIES.map(s => tEnum('SCENE_CATEGORIES', s)), [tEnum]);

  function renderTags(items: AssetItem[], isCase: boolean) {
    if (!items?.length) return null;
    const vis = items.slice(0, MAX_VISIBLE_TAGS);
    const rem = items.length - MAX_VISIBLE_TAGS;
    const ind = items[0].industry;
    const scn = items[0].sceneCategory;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {vis.map(a => {
          if (isCase) {
            const c = colorMap[a.solutionId || ''] || FALLBACK_COLOR;
            const dim = hl !== null && hl !== a.solutionId;
            const dn = lang === 'zh' ? a.nameZh : a.nameEn;
            return (
              <span key={a.id} onClick={e => tagClick(e, a.id)} title={lang === 'zh' ? `${a.nameZh} — ${a.solutionName || ''}` : `${a.nameEn} — ${a.solutionName || ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', fontSize: '12px', borderRadius: '4px', border: `1px solid ${c}`, background: `${c}14`, color: c, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'fit-content', opacity: dim ? 0.25 : 1 }}
                onMouseEnter={e => { if (!dim) e.currentTarget.style.background = `${c}26`; }}
                onMouseLeave={e => { if (!dim) e.currentTarget.style.background = `${c}14`; }}
              ><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: c, flexShrink: 0 }} />{trunc(dn, NAME_MAX_LEN)}</span>
            );
          } else {
            const c = colorMap[a.id] || FALLBACK_COLOR;
            const dn = lang === 'zh' ? a.nameZh : a.nameEn;
            return (
              <span key={a.id} onClick={e => tagClick(e, a.id)} title={lang === 'zh' ? a.nameZh : a.nameEn}
                style={{ display: 'inline-block', padding: '3px 10px', fontSize: '12px', borderRadius: '4px', border: `1px solid ${c}`, background: `${c}0D`, color: '#1D2129', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'fit-content' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${c}1A`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${c}0D`; }}
              >{trunc(dn, NAME_MAX_LEN)}</span>
            );
          }
        })}
        {rem > 0 && <span onClick={e => viewAll(e, ind, scn)} style={{ fontSize: '11px', color: '#165DFF', cursor: 'pointer', padding: '2px 0', fontWeight: 500 }}>{dict.viewAll(items.length)}</span>}
      </div>
    );
  }

  const isCase = mode === 'case';
  const thS: React.CSSProperties = { padding: '8px 14px', background: '#F7F8FA', borderBottom: '1px solid #E5E6EB', borderRight: '1px solid #E5E6EB', color: '#86909C', fontWeight: 500, fontSize: '12px', textAlign: 'left', position: 'sticky', left: 0, zIndex: 2 };
  const colS: React.CSSProperties = { padding: '8px 8px', background: '#F7F8FA', borderBottom: '1px solid #E5E6EB', borderRight: '1px solid #E5E6EB', color: '#1D2129', fontWeight: 600, fontSize: '12px', textAlign: 'center', whiteSpace: 'nowrap', minWidth: '150px' };
  const rowS: React.CSSProperties = { padding: '8px 14px', background: '#F7F8FA', borderBottom: '1px solid #E5E6EB', borderRight: '1px solid #E5E6EB', fontWeight: 600, color: '#1D2129', fontSize: '13px', verticalAlign: 'top', position: 'sticky', left: 0, zIndex: 1 };

  // 模式滑块指示
  const sliderStyle: React.CSSProperties = {
    position: 'absolute', top: '3px', width: 'calc(50% - 3px)', height: 'calc(100% - 6px)',
    borderRadius: '4px', background: '#fff', transition: 'left 200ms ease',
    left: isCase ? '3px' : '50%',
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px 48px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1D2129', margin: '0 0 8px 0', lineHeight: 1.5 }}>{dict.matrixTitle}</h1>
        <p style={{ fontSize: '14px', color: '#86909C', margin: 0, lineHeight: 1.5 }}>{dict.matrixSubtitle(sc, cc, latest)}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', display: 'inline-flex', borderRadius: '5px', background: '#F0F2F5', padding: '3px', minWidth: '200px' }}>
          <div style={sliderStyle} />
          <button onClick={() => { setMode('case'); setHl(null); }} style={{ position: 'relative', zIndex: 1, flex: 1, padding: '6px 16px', fontSize: '13px', fontWeight: isCase ? 600 : 400, borderRadius: '4px', border: 'none', background: 'transparent', color: isCase ? '#165DFF' : '#4E5969', cursor: 'pointer', transition: 'color 200ms' }}>{dict.modeCase}</button>
          <button onClick={() => { setMode('solution'); setHl(null); }} style={{ position: 'relative', zIndex: 1, flex: 1, padding: '6px 16px', fontSize: '13px', fontWeight: !isCase ? 600 : 400, borderRadius: '4px', border: 'none', background: 'transparent', color: !isCase ? '#165DFF' : '#4E5969', cursor: 'pointer', transition: 'color 200ms' }}>{dict.modeSolution}</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '12px', lineHeight: 1.5 }}>
          {isCase ? (legend.length > 0 ? legend.map(s => {
            const c = colorMap[s.id] || FALLBACK_COLOR; const a = hl === s.id;
            return <span key={s.id} onClick={() => toggleHl(s.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '4px', border: a ? `1px solid ${c}` : '1px solid transparent', background: a ? `${c}14` : 'transparent', cursor: 'pointer', fontWeight: a ? 600 : 400, color: a ? c : '#4E5969', userSelect: 'none' }}
              onMouseEnter={e => { if (!a) e.currentTarget.style.background = '#F0F2F5'; }} onMouseLeave={e => { if (!a) e.currentTarget.style.background = 'transparent'; }}
            ><span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: c, flexShrink: 0 }} />{s.nameZh}</span>;
          }) : <span style={{ color: '#86909C' }}>{dict.legendNoData}</span>) : <span style={{ color: '#86909C' }}>{dict.legendSolutionHint}</span>}
        </div>
      </div>

      <div style={{ border: '1px solid #E5E6EB', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: MATRIX_INDUSTRIES.length * 150 + 160, borderCollapse: 'collapse', fontSize: '13px', lineHeight: 1.5 }}>
            <thead>
              <tr>
                <th style={{ ...thS, width: '160px' }}>{dict.matrixCorner}</th>
                {MATRIX_INDUSTRIES.map((ind, i) => (
                  <th key={ind} style={colS} title={dInd[i]}>{dInd[i]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCENE_CATEGORIES.map((scene, si) => (
                <tr key={scene}>
                  <td style={rowS} title={dScn[si]}>{dScn[si]}</td>
                  {MATRIX_INDUSTRIES.map(ind => {
                    const k = ck(scene, ind);
                    const items = isCase ? (caseMap[k] || []) : (solMap[k] || []);
                    return <td key={ind} style={{ padding: items.length > 0 ? '8px' : '12px 8px', borderBottom: '1px solid #E5E6EB', borderRight: '1px solid #E5E6EB', verticalAlign: 'top', background: '#fff' }}>{renderTags(items, isCase)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
