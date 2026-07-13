import type { ReactNode } from 'react';

/**
 * 信息小卡片 — 详情页中承载一组关键数据的容器
 */
export default function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ padding: '14px 16px', borderRadius: '4px', border: '1px solid var(--color-border-light)', background: '#FAFBFC' }}>
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{children}</div>
    </div>
  );
}
