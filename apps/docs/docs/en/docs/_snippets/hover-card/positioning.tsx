import { HoverCard } from '@moduix/react/hover-card';
import { Building2Icon } from 'lucide-react';

export default function PositioningHoverCard() {
  return (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <HoverCard.Trigger
        style={{
          backgroundColor: 'var(--moduix-color-muted)',
          borderRadius: 'var(--moduix-radius-sm)',
          paddingInline: 'var(--moduix-spacing-1)',
          textDecoration: 'none',
        }}
      >
        Atlas workspace
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-1)' }}>
            <Building2Icon aria-hidden size={16} />
            <strong>Atlas design system</strong>
          </div>
          <p>12 collaborators · positioned right with a 12px gutter.</p>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}