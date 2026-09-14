import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-nested.module.css';

export default function NestedPopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open settings</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Settings</Popover.Title>
            <Popover.Description>Nested popovers keep independent state.</Popover.Description>
          </Popover.Header>
          <Popover.Body class={styles.body}>
            <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
              <Popover.Trigger asChild={(props) => <Button {...props()}>Advanced</Button>} />
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Header>
                    <Popover.Title>Advanced settings</Popover.Title>
                    <Popover.Description>
                      This content belongs to the nested popover.
                    </Popover.Description>
                  </Popover.Header>
                  <Popover.Footer>
                    <Popover.CloseTrigger>Close</Popover.CloseTrigger>
                  </Popover.Footer>
                </Popover.Content>
              </Popover.Positioner>
            </Popover>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}