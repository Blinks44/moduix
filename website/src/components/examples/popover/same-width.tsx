import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import styles from '@/components/examples/popover/popover-same-width.module.css';

export default function SameWidthPopoverDemo() {
  return (
    <Popover
      positioning={{
        sameWidth: true,
        gutter: 8,
      }}
    >
      <PopoverTrigger asChild>
        <Button className={styles.trigger}>Match this trigger width</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={styles.content}>
          <PopoverTitle>Matched width</PopoverTitle>
          <PopoverDescription>
            The content uses Ark's reference width measurement.
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}