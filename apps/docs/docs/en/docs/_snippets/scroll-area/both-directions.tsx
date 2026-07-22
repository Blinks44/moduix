import { ScrollArea } from '@moduix/react';
import styles from '@/components/examples/scroll-area.module.css';

const cells = Array.from(
  {
    length: 96,
  },
  (_, index) => index + 1,
);

export default function BothDirectionsScrollAreaDemo() {
  return (
    <ScrollArea className={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.gridContent}>
            {cells.map((cell) => (
              <div key={cell} className={styles.cell}>
                {cell}
              </div>
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