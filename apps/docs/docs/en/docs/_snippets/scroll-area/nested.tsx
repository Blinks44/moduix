import { ScrollArea } from '@moduix/react';
import styles from '@/components/examples/scroll-area.module.css';

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
    <ScrollArea className={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.textContent}>
            <section>
              <h3>Outer release notes</h3>
              <p className={styles.paragraph}>{sections[0].body}</p>
            </section>
            <ScrollArea className={styles.nestedRoot}>
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <div className={styles.textContent}>
                    {sections.map((item) => (
                      <section key={item.title}>
                        <h3>{item.title}</h3>
                        <p className={styles.paragraph}>{item.body}</p>
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