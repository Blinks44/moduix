import { ScrollArea } from '@moduix/react/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-fade.module.css';

const items = Array.from({ length: 10 }, (_, index) => `Section ${index + 1}`);

export default function FadeScrollAreaDemo() {
  return (
    <ScrollArea fade className={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.content}>
            {items.map((item) => (
              <section key={item}>
                <h3>{item}</h3>
                <p className={styles.description}>
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