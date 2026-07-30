import { Spinner } from '@moduix/react';

export default function SpinnerInlineDemo() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--moduix-spacing-2)' }}>
      <Spinner decorative size="inherit" />
      <span style={{ color: 'var(--moduix-color-muted-foreground)' }}>Saving changes</span>
    </div>
  );
}