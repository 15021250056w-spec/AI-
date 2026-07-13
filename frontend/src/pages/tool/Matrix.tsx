import { useNavigate } from 'react-router-dom';
import { solutions } from '../../data/solutions';
import { cases } from '../../data/cases';
import { getAllIndustries, getAllAssets } from '../../utils/assetFilter';
import { TYPE_LABEL } from '../../data/labels';
import Tag from '../../components/Tag';
import type { AssetItem } from '../../utils/assetFilter';

/* ================================================================
 * 资产矩阵 — 交叉概览页
 * ================================================================ */

interface CapabilityDomain {
  name: string;
  keyword: string;
  assetIds: string[];
}

const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  { name: '翻译与本地化', keyword: '翻译', assetIds: ['sol-001', 'case-001', 'case-002', 'case-004', 'case-006'] },
  { name: '内容生成', keyword: '内容生成', assetIds: ['case-003', 'case-005'] },
  { name: 'AI基础设施与知识图谱', keyword: '知识图谱', assetIds: ['sol-002', 'sol-003', 'case-007', 'case-008', 'case-009'] },
];

const INDUSTRY_COLUMNS = getAllIndustries();
const ASSET_MAP = new Map<string, AssetItem>();
getAllAssets().forEach(a => ASSET_MAP.set(a.id, a));

export default function Matrix() {
  const navigate = useNavigate();
  const totalAssets = solutions.length + cases.length;

  const getCellAssets = (domain: CapabilityDomain, industry: string): AssetItem[] =>
    domain.assetIds.map(id => ASSET_MAP.get(id)).filter((a): a is AssetItem => !!a && a.industryList.includes(industry));

  const cellCardStyle: React.CSSProperties = {
    padding: '7px 9px', borderRadius: '8px', border: '1px solid var(--color-border-light)',
    background: '#FAFBFC', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  };

  return (
    <div style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto', padding: '28px 20px 40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '6px', color: 'var(--color-primary)', fontWeight: 700 }}>AI能力资产概览矩阵</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
          覆盖 {solutions.length} 大解决方案、{cases.length} 项落地资产、跨 {INDUSTRY_COLUMNS.length} 个核心行业
          <span style={{ margin: '0 12px', color: 'var(--color-border)' }}>|</span> 更新于 2026-07-10
        </p>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          点击单元格资产可跳转详情页，点击行列标题可跳转浏览器 ← 表格可横向滚动 →
        </p>
      </div>

      {/* 横向滚动容器 + 右侧渐变遮罩提示 */}
      <div style={{ position: 'relative' }}>
        <div style={{
          overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px',
          background: 'var(--color-bg-card)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: INDUSTRY_COLUMNS.length * 170 + 160 }}>
            <thead>
              <tr>
                <th style={{ width: '160px', padding: '12px 16px', background: '#F8F9FB', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border-light)', color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '12px', textAlign: 'left', position: 'sticky', left: 0, zIndex: 1 }}>
                  能力域 ＼ 目标行业
                </th>
                {INDUSTRY_COLUMNS.map(ind => (
                  <th key={ind} onClick={() => navigate(`/tool/browser?industry=${encodeURIComponent(ind)}`)}
                    style={{ padding: '10px 12px', background: '#F8F9FB', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border-light)', color: 'var(--color-primary-light)', fontWeight: 600, fontSize: '12px', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    title={`点击查看「${ind}」全部资产`}
                  >{ind}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPABILITY_DOMAINS.map(domain => (
                <tr key={domain.name}>
                  <td onClick={() => navigate(`/tool/browser?keyword=${encodeURIComponent(domain.keyword)}`)}
                    style={{ padding: '12px 16px', background: '#F8F9FB', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border-light)', fontWeight: 600, color: 'var(--color-text-main)', fontSize: '13px', verticalAlign: 'top', cursor: 'pointer', position: 'sticky', left: 0, zIndex: 1 }}
                    title={`在浏览器中搜索「${domain.keyword}」`}
                  >
                    {domain.name}
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 400, marginTop: '4px' }}>{domain.assetIds.length} 项资产</div>
                  </td>
                  {INDUSTRY_COLUMNS.map(ind => {
                    const cellAssets = getCellAssets(domain, ind);
                    return (
                      <td key={ind} style={{ padding: cellAssets.length ? '8px' : '14px 8px', borderBottom: '1px solid var(--color-border-light)', borderRight: '1px solid var(--color-border-light)', verticalAlign: 'top', textAlign: cellAssets.length ? 'left' : 'center' }}>
                        {cellAssets.length === 0 ? (
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>—</span>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {cellAssets.map(asset => (
                              <div key={asset.id}
                                onClick={() => navigate(asset.type === 'solution' ? `/tool/solution/${asset.id}` : `/tool/case/${asset.id}`)}
                                style={cellCardStyle}
                                onMouseEnter={e => { e.currentTarget.style.background = '#EDF0F5'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#FAFBFC'; }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                                  <Tag variant={asset.type} size="small">{TYPE_LABEL[asset.type]}</Tag>
                                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                                    {asset.nameZh.length > 12 ? asset.nameZh.slice(0, 12) + '…' : asset.nameZh}
                                  </span>
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                                  {asset.shortDesc.length > 24 ? asset.shortDesc.slice(0, 24) + '…' : asset.shortDesc}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 右侧渐变遮罩 — 提示可横向滚动 */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '48px',
          background: 'linear-gradient(to left, rgba(245,247,250,0.6), transparent)',
          pointerEvents: 'none', borderRadius: '0 8px 8px 0',
        }} />
      </div>

      <div style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', background: '#F8F9FB', border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
        <span>💡</span>
        <span>
          矩阵展示 {CAPABILITY_DOMAINS.length} 个能力域 × {INDUSTRY_COLUMNS.length} 个核心行业的资产分布概览。
          查看全量 {totalAssets} 项资产与多维筛选，请前往
          <span onClick={() => navigate('/tool/browser')} style={{ color: 'var(--color-primary-light)', fontWeight: 500, cursor: 'pointer', margin: '0 4px' }}>资产浏览器</span>
        </span>
      </div>
    </div>
  );
}
