import { Button, ScrollArea } from '@moduix/react';
import { scrollSections } from '@/components/examples/scroll-sections';
import styles from '@/components/examples/scroll-area.module.css';

export default function RootProviderScrollAreaDemo() {
  const scrollArea = ScrollArea.useScrollArea();
  return (
    <div className={styles.providerStack}>
      <div className={styles.actions}>
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({
              edge: 'top',
            })
          }
        >
          Top
        </Button>
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({
              edge: 'bottom',
            })
          }
        >
          Bottom
        </Button>
      </div>
      <ScrollArea.RootProvider value={scrollArea} className={styles.root}>
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
      </ScrollArea.RootProvider>
    </div>
  );
}