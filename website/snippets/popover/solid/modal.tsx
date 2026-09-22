import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-modal.module.css';

export default function ModalPopoverDemo() {
  let inputRef: HTMLInputElement | null = null;

  return (
    <Popover modal initialFocusEl={() => inputRef}>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Invite teammates</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Invite teammates</PopoverTitle>
            <PopoverDescription>
              Focus is trapped inside this modal popover until dismissed.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverBody>
            <label class={styles.label}>
              <span>Email</span>
              <input ref={(element) => (inputRef = element)} class={styles.input} />
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