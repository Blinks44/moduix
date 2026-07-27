import { HoverCard } from '@moduix/react';
import { ChevronDownIcon, ChevronUpIcon, CircleCheckIcon } from 'lucide-react';

export default function ContextHoverCard() {
  return (
    <HoverCard>
      <HoverCard.Context>
        {(hoverCard) => (
          <HoverCard.Trigger
            style={{
              backgroundColor: 'var(--moduix-color-muted)',
              borderRadius: 'var(--moduix-radius-sm)',
              paddingInline: 'var(--moduix-spacing-1)',
              textDecoration: 'none',
            }}
          >
            @sarah_chen
            {hoverCard.open ? (
              <ChevronUpIcon aria-hidden size={16} />
            ) : (
              <ChevronDownIcon aria-hidden size={16} />
            )}
          </HoverCard.Trigger>
        )}
      </HoverCard.Context>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-1)' }}>
            <CircleCheckIcon aria-hidden size={16} />
            <strong>Following Sarah Chen</strong>
          </div>
          <p>The trigger icon follows the current open state.</p>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}