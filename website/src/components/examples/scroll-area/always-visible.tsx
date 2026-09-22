import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/react/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-always-visible.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Inbox item ${index + 1}`);

export default function AlwaysVisibleScrollAreaDemo() {
  return (
    <ScrollArea variant="always" className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className={styles.content}>
            {items.map((item) => (
              <div key={item} className={styles.item}>
                {item}
              </div>
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