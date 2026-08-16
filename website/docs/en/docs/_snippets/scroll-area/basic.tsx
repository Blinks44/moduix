import { ScrollArea } from '@moduix/react/scroll-area';

const sections = [
  {
    title: 'Release notes',
    body: 'Keep long updates readable without making the surrounding page harder to scan.',
  },
  {
    title: 'Keyboard scrolling',
    body: 'The viewport is a native scroll container, so wheel, trackpad, touch, and keyboard scrolling keep working.',
  },
  {
    title: 'Scrollbar feedback',
    body: 'Hovering the edge reveals the custom thumb while the content remains in its normal document flow.',
  },
  {
    title: 'More content',
    body: 'A bounded root creates a focused scroll region instead of extending the whole page.',
  },
  {
    title: 'Bottom edge',
    body: 'Ark tracks the visible edges and measures the thumb for the styled scrollbar.',
  },
];

export default function ScrollAreaDemo() {
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
              gap: 'var(--moduix-spacing-3)',
              padding: 'var(--moduix-spacing-3)',
            }}
          >
            {sections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p style={{ margin: 0 }}>{item.body}</p>
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