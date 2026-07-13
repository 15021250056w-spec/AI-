import type { ReactNode } from 'react';

/**
 * Tag 组件 — 统一资产标签
 *
 * 预设 4 种状态色，全站一致：
 * - solution   方案类：深蓝色背景 + 白色文字
 * - clientCase 客户案例：绿色背景 + 白色文字
 * - capability 能力储备：灰色背景 + 深色文字
 * - label      行业/标签：浅灰背景 + 深色文字
 */

export type TagVariant = 'solution' | 'clientCase' | 'capability' | 'label';

interface TagProps {
  variant: TagVariant;
  children: ReactNode;
  /** 可选尺寸，默认 'default' */
  size?: 'small' | 'default';
}

/** 各 variant 对应的背景色 + 文字色 */
const STYLE_MAP: Record<TagVariant, { bg: string; color: string }> = {
  solution:   { bg: '#1E4696', color: '#FFFFFF' },
  clientCase: { bg: '#2E7D32', color: '#FFFFFF' },
  capability: { bg: '#C7CDD1', color: '#1D2129' },
  label:      { bg: '#F0F2F5', color: '#4E5969' },
};

export default function Tag({ variant, children, size = 'default' }: TagProps) {
  const { bg, color } = STYLE_MAP[variant];
  const isSmall = size === 'small';

  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 500,
        padding: isSmall ? '2px 8px' : '3px 10px',
        borderRadius: '4px',
        background: bg,
        color,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
