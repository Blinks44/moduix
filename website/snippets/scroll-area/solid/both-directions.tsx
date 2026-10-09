import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-both-directions.module.css';

const cells = Array.from(
  {
    length: 96,
  },
  (_, index) => index + 1,
);

export default function BothDirectionsScrollAreaDemo() {
  return (
    <ScrollArea class={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div class={styles.content}>
            {cells.map((cell) => (
              <div class={styles.cell}>{cell}</div>
            ))}
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}