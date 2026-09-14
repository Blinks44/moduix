import { ScrollArea } from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-fade.module.css';

const items = Array.from({ length: 10 }, (_, index) => `Section ${index + 1}`);

export default function FadeScrollAreaDemo() {
  return (
    <ScrollArea fade class={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div class={styles.content}>
            {items.map((item) => (
              <section>
                <h3>{item}</h3>
                <p class={styles.description}>
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