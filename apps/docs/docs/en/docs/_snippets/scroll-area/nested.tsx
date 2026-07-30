import { ScrollArea } from '@moduix/react';

const sections = [
  {
    title: 'Outer release notes',
    body: 'The outer viewport can contain normal content and another complete ScrollArea tree.',
  },
  {
    title: 'Nested details',
    body: 'The nested root owns its own measurements, overflow state, and scrollbar parts.',
  },
];

export default function NestedScrollAreaDemo() {
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
            <section>
              <h3>Outer release notes</h3>
              <p style={{ margin: 0 }}>{sections[0].body}</p>
            </section>
            <ScrollArea
              style={{
                height: '8rem',
                border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
                borderRadius: 'var(--moduix-radius-md)',
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