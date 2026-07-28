import { Input } from '@moduix/react';

export default function InputStatesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
      <Input readOnly aria-label="Read-only workspace" value="Assigned workspace" />
    </div>
  );
}