import { CloseButton } from '@moduix/react/close-button';

export default function CloseButtonDisabledDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-2)' }}>
        <CloseButton disabled aria-label="Close unavailable message" />
        <span>Native disabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-2)' }}>
        <CloseButton aria-disabled="true" aria-label="Close unavailable notification" />
        <span>ARIA disabled</span>
      </div>
    </div>
  );
}