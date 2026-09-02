import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import styles from '@/components/examples/popover/popover-same-width.module.css';

export default function SameWidthPopoverDemo() {
  return (
    <Popover
      positioning={{
        sameWidth: true,
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button className={styles.trigger}>Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className={styles.content}>
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark's reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}