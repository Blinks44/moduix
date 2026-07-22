import { ScrollArea } from '@moduix/react';
import { scrollSections } from '@/components/examples/scroll-sections';
import styles from '@/components/examples/scroll-area.module.css';

export default function AlwaysVisibleScrollAreaDemo() {
  return (
    <ScrollArea className={styles.root} variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.textContent}>
            {scrollSections.map((item) => (
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
  );
}