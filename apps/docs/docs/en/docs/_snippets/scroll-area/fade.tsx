import { ScrollArea } from '@moduix/react';

const items = Array.from({ length: 10 }, (_, index) => `Section ${index + 1}`);

export default function FadeScrollAreaDemo() {
  return (
    <ScrollArea
      fade
      style={{
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
              gap: 'var(--moduix-spacing-3)',
              padding: 'var(--moduix-spacing-3)',
            }}
          >
            {items.map((item) => (
              <section key={item}>
                <h3>{item}</h3>
                <p style={{ margin: 0 }}>
                  The fade responds to the viewport’s current overflow distance.
                </p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}