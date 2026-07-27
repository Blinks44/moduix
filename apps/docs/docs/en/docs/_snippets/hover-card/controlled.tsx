import { Avatar, Button, HoverCard } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledHoverCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
        <HoverCard.Trigger
          style={{
            backgroundColor: 'var(--moduix-color-muted)',
            borderRadius: 'var(--moduix-radius-sm)',
            paddingInline: 'var(--moduix-spacing-1)',
            textDecoration: 'none',
          }}
        >
          @sarah_chen
        </HoverCard.Trigger>
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
                  Product designer · 24 projects
                </div>
              </div>
            </div>
            <p>Use the Toggle button to control this card.</p>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard>
      <PreviewMeta>
        <output>Open: {open ? 'yes' : 'no'}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </PreviewMeta>
    </>
  );
}