import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

/**
 * 通用面包屑导航 — 13px，当前页加粗，可点击项 hover 下划线
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '24px', flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {i > 0 && <ChevronRight size={12} />}
          {item.path ? (
            <span
              onClick={() => navigate(item.path!)}
              style={{ color: 'var(--color-primary-light)', cursor: 'pointer', fontWeight: 500 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
            >
              {item.label}
            </span>
          ) : (
            <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
