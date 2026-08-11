import { Button } from '@moduix/react/button';
import { HoverCard } from '@moduix/react/hover-card';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

function HoverCardPreview() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-2)', width: '14rem' }}>
      <img
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 'var(--moduix-radius-md)',
          display: 'block',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-1)' }}>
        <strong>Design systems that scale</strong>
        <p style={{ color: 'var(--moduix-color-muted-foreground)', margin: 0 }}>
          A practical guide to building clear, consistent product experiences.
        </p>
      </div>
    </div>
  );
}

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
            <HoverCardPreview />
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