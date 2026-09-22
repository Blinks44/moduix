import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/react/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-nested.module.css';

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
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={styles.content}>
            <section>
              <h3>Outer release notes</h3>
              <p className={styles.description}>{sections[0].body}</p>
            </section>
            <ScrollArea className={styles.nested}>
              <ScrollAreaViewport>
                <ScrollAreaContent>
                  <div className={styles.nestedContent}>
                    {sections.map((item) => (
                      <section key={item.title}>
                        <h3>{item.title}</h3>
                        <p className={styles.description}>{item.body}</p>
                      </section>
                    ))}
                  </div>
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar>
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}