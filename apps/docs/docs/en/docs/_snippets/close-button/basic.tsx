import { CloseButton } from '@moduix/react';
import { useState } from 'react';

export default function CloseButtonDemo() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return <output>Notification dismissed</output>;
  }

  return (
    <div
      style={{
        position: 'relative',
        inlineSize: '100%',
        padding: 'var(--moduix-spacing-4)',
        border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-lg)',
        backgroundColor: 'var(--moduix-color-popover)',
        color: 'var(--moduix-color-popover-foreground)',
        boxShadow: 'var(--moduix-shadow-sm)',
      }}
    >
      <CloseButton
        aria-label="Dismiss notification"
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          insetBlockStart: 'var(--moduix-spacing-2)',
          insetInlineEnd: 'var(--moduix-spacing-2)',
        }}
      />
      <p style={{ margin: 0, fontWeight: 'var(--moduix-weight-semibold)' }}>Draft saved</p>
      <p style={{ margin: 'var(--moduix-spacing-1) 0 0' }}>The notification can be dismissed.</p>
    </div>
  );
}