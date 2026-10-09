import { Button } from '@moduix/react/button';
import { Input } from '@moduix/react/input';
import {
  Popover,
  PopoverAnchor,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import styles from '@/components/examples/popover/popover-anchor.module.css';

export default function AnchorPopoverDemo() {
  return (
    <div className={styles.root}>
      <Popover
        positioning={{
          gutter: 8,
        }}
      >
        <PopoverAnchor asChild>
          <Input placeholder="Popover anchor" />
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <Button>Open below the input</Button>
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Custom anchor</PopoverTitle>
              <PopoverDescription>
                The popup is positioned relative to the input instead of the trigger.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  );
}