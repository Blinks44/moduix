import { HoverCard, useHoverCard } from '@moduix/react';
import { MailIcon } from 'lucide-react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderHoverCard() {
  const hoverCard = useHoverCard();

  return (
    <>
      <HoverCard.RootProvider value={hoverCard}>
        <HoverCard.Trigger
          style={{
            backgroundColor: 'var(--moduix-color-muted)',
            borderRadius: 'var(--moduix-radius-sm)',
            paddingInline: 'var(--moduix-spacing-1)',
            textDecoration: 'none',
          }}
        >
          3 unread updates
        </HoverCard.Trigger>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--moduix-spacing-1)' }}>
              <MailIcon aria-hidden size={16} />
              <strong>Release planning</strong>
            </div>
            <p>The card state is owned outside the rendered tree.</p>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.RootProvider>
      <PreviewMeta>
        <output>Open: {hoverCard.open ? 'yes' : 'no'}</output>
      </PreviewMeta>
    </>
  );
}