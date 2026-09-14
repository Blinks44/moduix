import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-modal.module.css';

export default function ModalPopoverDemo() {
  let inputRef: HTMLInputElement | null = null;

  return (
    <Popover modal initialFocusEl={() => inputRef}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Invite teammates</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Invite teammates</Popover.Title>
            <Popover.Description>
              Focus is trapped inside this modal popover until dismissed.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <label class={styles.label}>
              <span>Email</span>
              <input ref={(element) => (inputRef = element)} class={styles.input} />
            </label>
          </Popover.Body>
          <Popover.Footer>
            <Popover.CloseTrigger>Done</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}