import { Badge } from '@moduix/react/badge';
import type { CSSProperties } from 'react';

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--moduix-spacing-2)',
} satisfies CSSProperties;

const smallStyle = {
  '--moduix-badge-height': '1rem',
  '--moduix-badge-padding-x': '0.5rem',
  '--moduix-badge-font-size': '0.625rem',
} as CSSProperties;

const largeStyle = {
  '--moduix-badge-height': '1.5rem',
  '--moduix-badge-padding-x': '0.75rem',
  '--moduix-badge-font-size': '0.8125rem',
} as CSSProperties;

const priorityStyle = {
  '--moduix-badge-bg': 'color-mix(in oklab, var(--moduix-color-warning) 15%, transparent)',
  '--moduix-badge-border-color':
    'color-mix(in oklab, var(--moduix-color-warning) 45%, transparent)',
  '--moduix-badge-color': 'var(--moduix-color-warning)',
} as CSSProperties;

export default function BadgeCustomStylingDemo() {
  return (
    <div style={rowStyle}>
      <Badge style={smallStyle}>Small</Badge>
      <Badge>Default</Badge>
      <Badge style={largeStyle}>Large</Badge>
      <Badge style={priorityStyle}>
        <Badge.Dot />
        Priority
      </Badge>
    </div>
  );
}