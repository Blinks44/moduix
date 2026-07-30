import { ScrollArea } from '@moduix/react';

const cells = Array.from(
  {
    length: 96,
  },
  (_, index) => index + 1,
);

export default function BothDirectionsScrollAreaDemo() {
  return (
    <ScrollArea
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
              gridTemplateColumns: 'repeat(12, 5rem)',
              gridTemplateRows: 'repeat(8, 5rem)',
              width: 'max-content',
              gap: 'var(--moduix-spacing-2)',
              padding: 'var(--moduix-spacing-3)',
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--moduix-radius-sm)',
                  background: 'var(--moduix-color-muted)',
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}