import { ScrollArea } from '@moduix/react/scroll-area';

const items = Array.from({ length: 12 }, (_, index) => `Inbox item ${index + 1}`);

export default function AlwaysVisibleScrollAreaDemo() {
  return (
    <ScrollArea
      variant="always"
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
    </ScrollArea>
  );
}