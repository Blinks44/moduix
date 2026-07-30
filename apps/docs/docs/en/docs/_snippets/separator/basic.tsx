import { Separator } from '@moduix/react';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorDemo() {
  return (
    <div
      style={{
        width: '100%',
        padding: 'var(--moduix-spacing-4)',
        border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-md)',
        backgroundColor: 'var(--moduix-color-background)',
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-4)' }}>
        <span>{sections[0]}</span>
        <Separator />
        <span>{sections[1]}</span>
      </div>
    </div>
  );
}