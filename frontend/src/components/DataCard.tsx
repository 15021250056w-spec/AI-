import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';
import type { AITableRow } from '../mock/data';

export default function DataCard({ data }: { data: AITableRow }) {
  const navigate = useNavigate();

  const itemType = data.remarks.includes('方案') ? 'solution' : 'case';

  const typeMap = {
    solution: { label: '方案', color: 'var(--color-primary-light)' },
    case: { label: '案例', color: '#00B42A' }
  };
  const typeInfo = typeMap[itemType];
  const tags = data.techLabels ? data.techLabels.split(',').map(s => s.trim()) : [];

  return (
    <div className="card" onClick={() => navigate(`/detail/${data.caseId}`)} style={{ position: 'relative' }}>
      
      {/* Date Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        fontSize: '12px',
        color: 'var(--color-text-muted)',
        background: 'var(--color-bg-page)',
        padding: '2px 8px',
        borderRadius: '12px',
        border: '1px solid var(--color-border-light)'
      }}>
        更新于 {data.updateDate}
      </div>

      {/* Type Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        fontSize: '12px',
        color: 'white',
        background: typeInfo.color,
        padding: '2px 8px',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        {typeInfo.label}
      </div>

      {/* Icon Area (Placeholder) */}
      <div style={{
        width: '40px',
        height: '40px',
        background: 'var(--color-aux-1)',
        color: 'var(--color-primary-light)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        marginTop: '28px' // Push down to make room for absolute type badge
      }}>
        <Box size={20} />
      </div>

      {/* Main Title */}
      <h3 style={{ 
        fontSize: 'var(--font-size-card)', 
        marginBottom: '8px',
        color: 'var(--color-text-main)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {data.nameZh}
      </h3>

      {/* Subtitle / Description (One line truncated) */}
      <p style={{ 
        fontSize: 'var(--font-size-body)', 
        color: 'var(--color-text-body)', 
        marginBottom: '16px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {data.shortDescription}
      </p>

      {/* Tags */}
      <div style={{ marginBottom: '16px' }}>
        {tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Delivery Form or Project Background */}
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '12px',
        borderTop: '1px dashed var(--color-border)',
        fontSize: '13px',
        color: 'var(--color-text-body)'
      }}>
        {data.deliveryFormat && (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>交付形式：</strong> {data.deliveryFormat}
          </div>
        )}
        {data.targetIndustry && (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>目标行业：</strong> {data.targetIndustry}
          </div>
        )}
        {data.department && (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>归属部门：</strong> {data.department}
          </div>
        )}
        {data.customerBackground && (
          <div style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            <strong>项目背景：</strong> {data.customerBackground}
          </div>
        )}
      </div>

    </div>
  );
}
