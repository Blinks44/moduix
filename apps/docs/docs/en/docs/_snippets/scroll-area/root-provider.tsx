import { Button } from '@moduix/react/button';
import { ScrollArea } from '@moduix/react/scroll-area';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);

export default function RootProviderScrollAreaDemo() {
  const scrollArea = ScrollArea.useScrollArea();
  const [edge, setEdge] = useState('top');

  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <ScrollArea.RootProvider
        value={scrollArea}
        style={{
          width: '100%',
          height: '13rem',
          border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
          borderRadius: 'var(--moduix-radius-lg)',
        }}
      >
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <div
              style={{
                display: 'grid',
                gap: 'var(--moduix-spacing-2)',
                padding: 'var(--moduix-spacing-3)',
              }}
            >
              {items.map((item) => (
                <div
                  key={item}
                  style={{
                    padding: 'var(--moduix-spacing-2)',
                    background: 'var(--moduix-color-muted)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.RootProvider>
      <PreviewMeta>
        <output>Current edge: {edge}</output>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            scrollArea.scrollToEdge({
              edge: 'top',
            });
            setEdge('top');
          }}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            scrollArea.scrollToEdge({
              edge: 'bottom',
            });
            setEdge('bottom');
          }}
        >
          Bottom
        </Button>
      </PreviewMeta>
    </div>
  );
}