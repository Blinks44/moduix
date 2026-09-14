import { Button } from '@moduix/solid/button';
import { Input } from '@moduix/solid/input';
import { Popover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-anchor.module.css';

export default function AnchorPopoverDemo() {
  return (
    <div class={styles.root}>
      <Popover positioning={{ gutter: 8 }}>
        <Popover.Anchor asChild={(props) => <Input {...props()} placeholder="Popover anchor" />} />
        <Popover.Trigger asChild={(props) => <Button {...props()}>Open below the input</Button>} />
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Custom anchor</Popover.Title>
              <Popover.Description>
                The popup is positioned relative to the input instead of the trigger.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}