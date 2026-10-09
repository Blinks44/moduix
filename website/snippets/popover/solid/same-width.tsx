import { Button } from '@moduix/solid/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-same-width.module.css';

export default function SameWidthPopoverDemo() {
  return (
    <Popover positioning={{ sameWidth: true, gutter: 8 }}>
      <PopoverTrigger
        asChild={(props) => (
          <Button {...props()} class={styles.trigger}>
            Match this trigger width
          </Button>
        )}
      />
      <PopoverPositioner>
        <PopoverContent class={styles.content}>
          <PopoverTitle>Matched width</PopoverTitle>
          <PopoverDescription>
            The content uses Ark's reference width measurement.
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}