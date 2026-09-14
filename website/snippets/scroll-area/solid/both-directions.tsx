import { ScrollArea } from '@moduix/solid/scroll-area';
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
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div class={styles.content}>
            {cells.map((cell) => (
              <div class={styles.cell}>{cell}</div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}