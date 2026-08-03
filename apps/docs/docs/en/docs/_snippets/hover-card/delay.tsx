import { HoverCard } from '@moduix/react/hover-card';
import { SparklesIcon } from 'lucide-react';

export default function DelayHoverCard() {
  return (
    <HoverCard openDelay={200} closeDelay={500}>
      <HoverCard.Trigger
        style={{
          backgroundColor: 'var(--moduix-color-muted)',
          borderRadius: 'var(--moduix-radius-sm)',
          paddingInline: 'var(--moduix-spacing-1)',
          textDecoration: 'none',
        }}
      >
        Release notes
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-1)' }}>
            <SparklesIcon aria-hidden size={16} />
            <strong>Moduix 2.2</strong>
          </div>
          <p>Opens after 200ms and stays available for 500ms after pointer leave.</p>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}