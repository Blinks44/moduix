import { ScrollArea } from '@moduix/react';
import styles from '@/components/examples/scroll-area.module.css';

const copy =
  'Long single-line or wide content can stay in one native scroll viewport while the custom horizontal track remains visible only when x-axis overflow exists.';

export default function HorizontalScrollAreaDemo() {
  return (
    <ScrollArea className={styles.horizontalRoot}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p className={styles.wideParagraph}>{copy}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}