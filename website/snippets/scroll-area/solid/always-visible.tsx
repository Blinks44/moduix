import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-always-visible.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Inbox item ${index + 1}`);

export default function AlwaysVisibleScrollAreaDemo() {
  return (
    <ScrollArea variant="always" class={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div class={styles.content}>
            {items.map((item) => (
              <div class={styles.item}>{item}</div>
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