import { HoverCard } from '@moduix/react/hover-card';

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
        Profile preview unavailable
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCardPreview />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}