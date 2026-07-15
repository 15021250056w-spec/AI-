import { useEffect } from 'react';
import { getAssetById } from '../../utils/assetFilter.js';

/* ================================================================
 * 类型定义（数据来自 .js 文件，在此声明接口供 TS 检查）
 * ================================================================ */

interface Asset {
  id: string;
  type: string;
  nameZh: string;
  nameEn: string;
  shortDesc?: string;
  industry: string;
  sceneCategory: string;
  businessLabels: string[];
  techLabels: string[];
  deliveryForm?: string;
  maturity?: string;
  bu: string;
  contactName: string;
  contactEmail: string;
  updateDate: string;
  regionLang?: string;
  detail?: string;
  // case-specific
  solutionId?: string;
  solutionName?: string;
  client?: string;
  projectStatus?: string;
  projectBg?: string;
  effectData?: string;
}

/**
 * AssetDetailPanel — 资产详情侧边面板（占位实现）
 *
 * 本批仅展示 nameZh、描述、type 三项基本信息，
 * 完整详情将在后续批次实现。
 */

interface AssetDetailPanelProps {
  assetId: string | null;
  onClose: () => void;
}

export default function AssetDetailPanel({ assetId, onClose }: AssetDetailPanelProps) {
  // ESC 关闭
  useEffect(() => {
    if (!assetId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [assetId, onClose]);

  if (!assetId) return null;

  const asset = getAssetById(assetId) as Asset | undefined;
  if (!asset) {
    return (
      <>
        {/* 遮罩 */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.3)',
          }}
        />
        {/* 面板 */}
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
          maxWidth: '100vw', zIndex: 201, background: '#fff',
          boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E6EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#1D2129' }}>资产未找到</span>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#86909C', padding: '4px 8px' }}>✕</button>
          </div>
          <div style={{ padding: '24px', color: '#86909C', fontSize: '14px' }}>未找到 ID 为 {assetId} 的资产。</div>
        </div>
      </>
    );
  }

  const isSolution = asset.type === 'solution';
  const typeLabel = isSolution ? '方案' : '案例';
  const desc = isSolution ? asset.shortDesc : asset.projectBg;

  return (
    <>
      {/* 遮罩层 */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.3)',
        }}
      />

      {/* 右侧面板 */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
        maxWidth: '100vw', zIndex: 201, background: '#fff',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* 面板头部 */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E6EB',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'inline-block', padding: '2px 8px', fontSize: '12px',
              fontWeight: 500, borderRadius: '4px',
              background: isSolution ? '#E8F0FE' : '#E8F5E9',
              color: isSolution ? '#165DFF' : '#2E7D32',
            }}>
              {typeLabel}
            </span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#1D2129' }}>
              {asset.nameZh}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: '18px', color: '#86909C', padding: '4px 8px',
              borderRadius: '4px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F0F2F5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            ✕
          </button>
        </div>

        {/* 面板内容 */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          {/* 基本信息 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#86909C', marginBottom: '8px' }}>
              基本信息
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                <Row label="中文名称" value={asset.nameZh} />
                <Row label="英文名称" value={asset.nameEn} />
                <Row label="类型" value={typeLabel} />
                <Row label="行业" value={asset.industry} />
                <Row label="场景分类" value={asset.sceneCategory} />
                {isSolution ? (
                  <>
                    <Row label="交付形式" value={asset.deliveryForm} />
                    <Row label="成熟度" value={asset.maturity} />
                  </>
                ) : (
                  <>
                    <Row label="客户" value={asset.client} />
                    <Row label="项目状态" value={asset.projectStatus} />
                    <Row label="归属方案" value={asset.solutionName} />
                  </>
                )}
                <Row label="BU" value={asset.bu} />
                <Row label="联系人" value={`${asset.contactName} (${asset.contactEmail})`} />
                <Row label="更新日期" value={asset.updateDate} />
              </tbody>
            </table>
          </div>

          {/* 描述 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#86909C', marginBottom: '8px' }}>
              {isSolution ? '简介' : '项目背景'}
            </div>
            <p style={{ fontSize: '14px', color: '#4E5969', lineHeight: 1.7, margin: 0 }}>
              {desc || '暂无描述'}
            </p>
          </div>

          {/* 标签 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#86909C', marginBottom: '8px' }}>
              业务标签
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {asset.businessLabels.map((l: string) => (
                <span key={l} style={{
                  padding: '3px 10px', fontSize: '12px', borderRadius: '4px',
                  background: '#F0F2F5', color: '#4E5969',
                }}>{l}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#86909C', marginBottom: '8px' }}>
              技术标签
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {asset.techLabels.map((l: string) => (
                <span key={l} style={{
                  padding: '3px 10px', fontSize: '12px', borderRadius: '4px',
                  background: '#F0F2F5', color: '#4E5969',
                }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid #E5E6EB',
          fontSize: '12px', color: '#86909C', textAlign: 'center',
        }}>
          完整详情将在后续版本中提供
        </div>
      </div>
    </>
  );
}

/** 信息行 */
function Row({ label, value }: { label: string; value?: string }) {
  return (
    <tr>
      <td style={{
        padding: '6px 12px 6px 0', color: '#86909C',
        borderBottom: '1px solid #F0F2F5', whiteSpace: 'nowrap',
        width: '80px',
      }}>{label}</td>
      <td style={{
        padding: '6px 0', color: '#1D2129',
        borderBottom: '1px solid #F0F2F5',
      }}>{value ?? '—'}</td>
    </tr>
  );
}
