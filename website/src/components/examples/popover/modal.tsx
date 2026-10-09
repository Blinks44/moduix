import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import { useRef } from 'react';
import styles from '@/components/examples/popover/popover-modal.module.css';

export default function ModalPopoverDemo() {
  const inputRef = useRef(null as HTMLInputElement | null);
  return (
    <Popover modal initialFocusEl={() => inputRef.current}>
      <PopoverTrigger asChild>
        <Button>Invite teammates</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Invite teammates</PopoverTitle>
            <PopoverDescription>
              Focus is trapped inside this modal popover until dismissed.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverBody>
            <label className={styles.label}>
              <span>Email</span>
              <input ref={inputRef} className={styles.input} />
            </label>
          </PopoverBody>
          <PopoverFooter>
            <PopoverCloseTrigger>Done</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}