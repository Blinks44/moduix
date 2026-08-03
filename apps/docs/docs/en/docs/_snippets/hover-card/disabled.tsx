import { HoverCard } from '@moduix/react/hover-card';
import { CircleOffIcon } from 'lucide-react';

export default function DisabledHoverCard() {
  return (
    <HoverCard disabled>
      <HoverCard.Trigger
        style={{
          backgroundColor: 'var(--moduix-color-muted)',
          borderRadius: 'var(--moduix-radius-sm)',
          paddingInline: 'var(--moduix-spacing-1)',
          textDecoration: 'none',
        }}
      >
        <CircleOffIcon aria-hidden size={14} />
        Profile preview unavailable
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <strong>Sarah Chen</strong>
          <p>This preview is disabled.</p>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}