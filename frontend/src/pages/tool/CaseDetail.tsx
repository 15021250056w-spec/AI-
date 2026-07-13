import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { solutions } from '../../data/solutions';
import { cases } from '../../data/cases';
import { TYPE_LABEL } from '../../data/labels';
import Tag from '../../components/Tag';
import Breadcrumb from '../../components/tool/Breadcrumb';
import { ArrowLeft, Layers, ArrowUp } from 'lucide-react';

/* ================================================================
 * 案例/能力详情页
 * ================================================================ */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 99,
        width: '40px', height: '40px', borderRadius: '8px',
        border: '1px solid var(--color-border)', background: 'var(--color-bg-card)',
        color: 'var(--color-text-muted)', cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
      title="返回顶部"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const caseItem = cases.find(c => c.id === id);

  if (!caseItem) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-text-muted)' }}>案例未找到</h2>
        <button className="btn btn-ghost" onClick={() => navigate('/tool/browser')} style={{ marginTop: 16, border: '1px solid var(--color-border)', borderRadius: 6 }}>返回资产浏览器</button>
      </div>
    );
  }

  const parentSolution = solutions.find(s => s.id === caseItem.solutionBelongId);
  const siblingAssets = cases.filter(c => c.solutionBelongId === caseItem.solutionBelongId && c.id !== caseItem.id);
  const isCapability = caseItem.type === 'capability';
  const goToLabel = (label: string) => navigate(`/tool/browser?labels=${encodeURIComponent(label)}`);

  const cardStyle: React.CSSProperties = { borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 20px 48px' }}>

      {/* 面包屑 + 顶部返回 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Breadcrumb items={[
          { label: '资产矩阵', path: '/tool/matrix' },
          { label: '资产浏览器', path: '/tool/browser' },
          { label: caseItem.nameZh },
        ]} />
        <button
          onClick={() => navigate('/tool/browser')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-body)', cursor: 'pointer', fontWeight: 500, flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-body)'; }}
        >
          <ArrowLeft size={14} /> 返回资产浏览器
        </button>
      </div>

      {/* 头部 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px', lineHeight: 1.3 }}>{caseItem.nameZh}</h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>{caseItem.nameEn}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <Tag variant={caseItem.type}>{TYPE_LABEL[caseItem.type]}</Tag>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>更新于 {caseItem.updateDate}</span>
        </div>
      </div>

      {/* 归属方案 */}
      {parentSolution && (
        <div onClick={() => navigate(`/tool/solution/${parentSolution.id}`)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid var(--color-border-light)', background: '#FAFBFC', cursor: 'pointer', marginBottom: '24px', transition: 'border-color 0.1s', ...cardStyle }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
        >
          <Layers size={14} color="var(--color-primary)" />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>归属方案：</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{parentSolution.nameZh}</span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>点击查看方案详情 →</span>
        </div>
      )}

      {/* 核心摘要 */}
      <div style={{ padding: '16px 20px', border: '1px solid var(--color-border-light)', background: '#FAFBFC', marginBottom: '24px', ...cardStyle }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.6 }}>{caseItem.shortDesc}</div>
      </div>

      {/* 详情内容 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>{isCapability ? '适用场景' : '客户 / 项目背景'}</div>
          <p style={{ fontSize: '14px', color: 'var(--color-text-body)', lineHeight: 1.7, margin: 0 }}>{caseItem.clientBg}</p>
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '4px' }}>详细说明</div>
          <p style={{ fontSize: '14px', color: 'var(--color-text-body)', lineHeight: 1.7, margin: 0 }}>{caseItem.detail}</p>
        </div>
      </div>

      {/* 信息卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: '目标行业', content: <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>{caseItem.industryList.map(ind => <Tag key={ind} variant="label" size="small">{ind}</Tag>)}</div> },
          { label: '交付形式', content: <span>{caseItem.deliveryForm.filter(f => f !== '待补充').join(' / ') || '—'}</span> },
          { label: '成熟度', content: <span>{caseItem.maturity}</span> },
          { label: '归属部门', content: <span>{caseItem.owner}</span> },
        ].map((item, i) => (
          <div key={i} style={{ padding: '14px 16px', border: '1px solid var(--color-border-light)', background: '#FAFBFC', ...cardStyle }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: 500 }}>{item.label}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{item.content}</div>
          </div>
        ))}
      </div>

      {/* 标签矩阵 */}
      <div style={{ marginBottom: '28px' }}>
        {[
          { title: '业务标签（点击筛选）', labels: caseItem.businessLabels },
          { title: '底层技术标签（点击筛选）', labels: caseItem.techLabels },
        ].map((group, i) => (
          <div key={i} style={{ marginBottom: i === 0 ? '10px' : 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>{group.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {group.labels.map(l => (
                <span key={l} onClick={() => goToLabel(l)} style={{ cursor: 'pointer' }} title={`在浏览器中筛选「${l}」`}>
                  <Tag variant="label" size="small">{l}</Tag>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部操作 */}
      <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {siblingAssets.length > 0 && (
          <button onClick={() => navigate(`/tool/browser?solution=${caseItem.solutionBelongId}`)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-body)', cursor: 'pointer' }}>
            查看同方案其他资产（{siblingAssets.length}）
          </button>
        )}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-body)', cursor: 'pointer' }}>
          <ArrowUp size={14} /> 返回顶部
        </button>
        <button onClick={() => navigate('/tool/browser')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', color: 'var(--color-text-body)', cursor: 'pointer' }}>
          <ArrowLeft size={14} /> 返回资产浏览器
        </button>
      </div>

      <ScrollToTop />
    </div>
  );
}
