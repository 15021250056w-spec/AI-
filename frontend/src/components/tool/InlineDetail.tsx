import { getCasesBySolutionId } from '../../utils/assetFilter.js';
import { useLang } from '../../i18n/context';
import { Copy, Check, X } from 'lucide-react';

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

interface InlineDetailProps {
  asset: AssetItem;
  onTagClick: (group: 'business' | 'tech', label: string) => void;
  onAssetClick: (id: string) => void;
  onCopyLink: () => void;
  onClose: () => void;
  copied?: boolean;
}

export default function InlineDetail({ asset, onTagClick, onAssetClick, onCopyLink, onClose, copied }: InlineDetailProps) {
  const { lang, dict, tEnum } = useLang();
  const isSolution = asset.type === 'solution';
  const displayName = lang === 'zh' ? asset.nameZh : asset.nameEn;
  const displaySub = lang === 'zh' ? asset.nameEn : asset.nameZh;

  const st: React.CSSProperties = { fontSize: '12px', fontWeight: 600, color: '#86909C', marginBottom: '8px', lineHeight: 1.5 };
  const bt: React.CSSProperties = { fontSize: '14px', color: '#4E5969', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' };
  const tagS: React.CSSProperties = { display: 'inline-block', padding: '3px 10px', fontSize: '12px', borderRadius: '4px', background: '#F0F2F5', color: '#4E5969', cursor: 'pointer', fontWeight: 500, userSelect: 'none', border: '1px solid transparent' };

  return (
    <div style={{ display: 'flex', background: '#F5F7FA', position: 'relative', lineHeight: 1.5 }}>
      {/* 左侧 3px 蓝色竖条 */}
      <div style={{ width: '3px', flexShrink: 0, background: '#165DFF' }} />

      <div style={{ flex: 1, padding: '20px 24px', minWidth: 0 }}>
        {/* 关闭按钮 */}
        <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#86909C', padding: '4px', borderRadius: '4px' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#E5E6EB'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        ><X size={16} /></button>

        {/* 头部 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', paddingRight: '24px', flexWrap: 'wrap' }}>
          <TypeBadge type={asset.type} dict={dict} />
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#1D2129' }}>{displayName}</span>
          <span style={{ fontSize: '12px', color: '#86909C' }}>{displaySub}</span>
          <span style={{ fontSize: '12px', color: '#86909C', marginLeft: 'auto' }}>{asset.updateDate}</span>
          <button onClick={onCopyLink} title={dict.btnCopyLink}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #EBECF0', background: '#fff', color: copied ? '#00B42A' : '#4E5969', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = '#E5E6EB'; e.currentTarget.style.color = '#4E5969'; } }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />} {dict.btnCopyLink}
          </button>
        </div>

        {/* 属性信息区 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px 24px', marginBottom: '18px', padding: '14px 16px', background: '#fff', borderRadius: '6px', border: '1px solid #EBECF0' }}>
          <Attr label={dict.fieldIndustry} value={tEnum('INDUSTRIES', asset.industry)} />
          <Attr label={dict.fieldScene} value={tEnum('SCENE_CATEGORIES', asset.sceneCategory)} />
          {isSolution ? (
            <>
              <Attr label={dict.fieldRegionLang} value={asset.regionLang} />
              <Attr label={dict.fieldDeliveryForm} value={asset.deliveryForm ? tEnum('DELIVERY_FORMS', asset.deliveryForm) : undefined} />
              <Attr label={dict.fieldMaturity} value={asset.maturity ? tEnum('MATURITY_LEVELS', asset.maturity) : undefined} />
            </>
          ) : (
            <>
              <Attr label={dict.fieldClient} value={asset.client} />
              <Attr label={dict.fieldProjectStatus} value={asset.projectStatus ? tEnum('PROJECT_STATUS', asset.projectStatus) : undefined} />
              <Attr label={dict.fieldBu} value={asset.bu} />
            </>
          )}
        </div>

        {/* 方案：详细说明 */}
        {isSolution && asset.detail && (
          <div style={{ marginBottom: '18px' }}>
            <div style={st}>{dict.sectionDetail}</div>
            <p style={bt}>{asset.detail}</p>
          </div>
        )}

        {/* 案例：归属方案 */}
        {!isSolution && asset.solutionId && (
          <div style={{ marginBottom: '18px' }}>
            <div style={st}>{dict.sectionParentSolution}</div>
            <span onClick={() => onAssetClick(asset.solutionId!)}
              style={{ display: 'inline-block', padding: '2px 12px', fontSize: '12px', fontWeight: 500, borderRadius: '4px', border: '1px solid #165DFF', color: '#165DFF', background: '#E8F0FE', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4E4FD'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E8F0FE'; }}
            >{asset.solutionName || dict.btnViewSolution}</span>
          </div>
        )}

        {/* 案例：项目背景 & 效果数据 */}
        {!isSolution && (
          <div style={{ marginBottom: '18px' }}>
            {asset.projectBg && <div style={{ marginBottom: '12px' }}><div style={st}>{dict.sectionProjectBg}</div><p style={bt}>{asset.projectBg}</p></div>}
            {asset.effectData && <div><div style={st}>{dict.sectionEffectData}</div><p style={bt}>{asset.effectData}</p></div>}
          </div>
        )}

        {/* 标签组 */}
        <div style={{ marginBottom: '18px' }}>
          <div style={st}>{dict.sectionBizLabels}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {asset.businessLabels.map(l => (
              <span key={l} onClick={() => onTagClick('business', l)} style={tagS}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = '#4E5969'; }}
              >{l}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '18px' }}>
          <div style={st}>{dict.sectionTechLabels}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {asset.techLabels.map(l => (
              <span key={l} onClick={() => onTagClick('tech', l)} style={tagS}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#165DFF'; e.currentTarget.style.color = '#165DFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = '#4E5969'; }}
              >{l}</span>
            ))}
          </div>
        </div>

        {/* 关联案例 */}
        {isSolution && <RelatedCases solutionId={asset.id} onCaseClick={onAssetClick} dict={dict} />}

        {/* 联系人 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', background: '#fff', borderRadius: '6px', border: '1px solid #EBECF0', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', color: '#4E5969', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 500, color: '#1D2129' }}>{asset.contactName}</span>
            <span style={{ margin: '0 8px', color: '#E5E6EB' }}>|</span>
            {asset.bu}
          </span>
          <a href={`mailto:${asset.contactEmail}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 14px', fontSize: '12px', borderRadius: '4px', border: '1px solid #165DFF', background: '#fff', color: '#165DFF', cursor: 'pointer', fontWeight: 500, textDecoration: 'none', lineHeight: 1.5 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8F0FE'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >{dict.btnContact}</a>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
 * 子组件
 * ================================================================ */

function TypeBadge({ type, dict }: { type: string; dict: { labelSolution: string; labelCase: string } }) {
  const s = type === 'solution';
  return <span style={{ display: 'inline-block', padding: '2px 10px', fontSize: '12px', fontWeight: 500, borderRadius: '4px', background: s ? '#165DFF' : '#00B42A', color: '#fff' }}>{s ? dict.labelSolution : dict.labelCase}</span>;
}

function Attr({ label, value }: { label: string; value?: string }) {
  return <div style={{ fontSize: '14px', lineHeight: 1.5 }}><span style={{ color: '#86909C' }}>{label}：</span><span style={{ color: '#1D2129' }}>{value || '—'}</span></div>;
}

function RelatedCases({ solutionId, onCaseClick, dict }: { solutionId: string; onCaseClick: (id: string) => void; dict: { sectionRelatedCases: (n: number) => string } }) {
  const list = getCasesBySolutionId(solutionId) as AssetItem[];
  if (!list.length) return null;
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#86909C', marginBottom: '8px', lineHeight: 1.5 }}>{dict.sectionRelatedCases(list.length)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {list.map(c => (
          <span key={c.id} onClick={() => onCaseClick(c.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #EBECF0', background: '#fff', cursor: 'pointer', maxWidth: 'fit-content', lineHeight: 1.5 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#165DFF'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E6EB'; }}
          ><span style={{ fontWeight: 500, color: '#1D2129' }}>{c.nameZh}</span>{c.client && <><span style={{ color: '#E5E6EB' }}>|</span><span style={{ color: '#86909C', fontSize: '12px' }}>{c.client}</span></>}</span>
        ))}
      </div>
    </div>
  );
}
