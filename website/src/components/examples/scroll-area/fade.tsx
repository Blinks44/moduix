import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/react/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-fade.module.css';

const items = Array.from({ length: 10 }, (_, index) => `Section ${index + 1}`);

export default function FadeScrollAreaDemo() {
  return (
    <ScrollArea fade className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
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
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}