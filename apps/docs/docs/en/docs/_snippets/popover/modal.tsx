import { Button, Popover } from '@moduix/react';
import { useRef } from 'react';

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
            <label className="field">
              <span>Email</span>
              <input ref={inputRef} className="input" />
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