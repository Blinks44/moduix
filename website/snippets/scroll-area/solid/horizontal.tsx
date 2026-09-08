import { ScrollArea } from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-horizontal.module.css';

const copy =
  'Long single-line or wide content can stay in one native scroll viewport while the custom horizontal track remains visible only when x-axis overflow exists.';

export default function HorizontalScrollAreaDemo() {
  return (
    <ScrollArea class={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p class={styles.copy}>{copy}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}