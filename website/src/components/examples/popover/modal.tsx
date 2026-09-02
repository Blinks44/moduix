import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import { useRef } from 'react';
import styles from '@/components/examples/popover/popover-modal.module.css';

export default function ModalPopoverDemo() {
  const inputRef = useRef(null as HTMLInputElement | null);
  return (
    <Popover modal initialFocusEl={() => inputRef.current}>
      <Popover.Trigger asChild>
        <Button>Invite teammates</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Invite teammates</Popover.Title>
            <Popover.Description>
              Focus is trapped inside this modal popover until dismissed.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <label className={styles.label}>
              <span>Email</span>
              <input ref={inputRef} className={styles.input} />
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