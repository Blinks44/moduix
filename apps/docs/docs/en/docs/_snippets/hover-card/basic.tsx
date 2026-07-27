import { Avatar, HoverCard } from '@moduix/react';

export default function BasicHoverCard() {
  return (
    <HoverCard>
      <p>
        Liked by{' '}
        <HoverCard.Trigger
          style={{
            backgroundColor: 'var(--moduix-color-muted)',
            borderRadius: 'var(--moduix-radius-sm)',
            paddingInline: 'var(--moduix-spacing-1)',
            textDecoration: 'none',
          }}
        >
          @sarah_chen
        </HoverCard.Trigger>{' '}
        and 3 others
      </p>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <div style={{ display: 'flex', gap: 'var(--moduix-spacing-2)' }}>
            <Avatar size="sm">
              <Avatar.Fallback name="Sarah Chen" />
            </Avatar>
            <div>
              <strong>Sarah Chen</strong>
              <div style={{ color: 'var(--moduix-color-muted-foreground)' }}>
                @sarah_chen · Design Engineer
              </div>
            </div>
          </div>
          <p>Building accessible interfaces for the design system.</p>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}