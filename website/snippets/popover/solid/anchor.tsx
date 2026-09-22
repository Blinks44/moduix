import { Button } from '@moduix/solid/button';
import { Input } from '@moduix/solid/input';
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
} from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-anchor.module.css';

export default function AnchorPopoverDemo() {
  return (
    <div class={styles.root}>
      <Popover positioning={{ gutter: 8 }}>
        <PopoverAnchor asChild={(props) => <Input {...props()} placeholder="Popover anchor" />} />
        <PopoverTrigger asChild={(props) => <Button {...props()}>Open below the input</Button>} />
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