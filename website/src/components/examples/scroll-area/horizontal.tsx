import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/react/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-horizontal.module.css';

const copy =
  'Long single-line or wide content can stay in one native scroll viewport while the custom horizontal track remains visible only when x-axis overflow exists.';

export default function HorizontalScrollAreaDemo() {
  return (
    <ScrollArea className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <p className={styles.copy}>{copy}</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}