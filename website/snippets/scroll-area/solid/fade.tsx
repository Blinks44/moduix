import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-fade.module.css';

const items = Array.from({ length: 10 }, (_, index) => `Section ${index + 1}`);

export default function FadeScrollAreaDemo() {
  return (
    <ScrollArea fade class={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
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
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}