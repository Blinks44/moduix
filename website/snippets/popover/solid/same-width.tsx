import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-same-width.module.css';

export default function SameWidthPopoverDemo() {
  return (
    <Popover positioning={{ sameWidth: true, gutter: 8 }}>
      <Popover.Trigger
        asChild={(props) => (
          <Button {...props()} class={styles.trigger}>
            Match this trigger width
          </Button>
        )}
      />
      <Popover.Positioner>
        <Popover.Content class={styles.content}>
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark's reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}