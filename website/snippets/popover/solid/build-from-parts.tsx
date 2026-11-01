import { Button } from '@moduix/solid/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/solid/popover';
import { Stack } from '@moduix/solid/stack';
import { Bell as BellIcon } from 'lucide-solid';
import styles from '@/components/examples/popover/popover-build-from-parts.module.css';

export default function BuildFromPartsPopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger
        asChild={(props) => (
          <Button {...props()}>
            <BellIcon aria-hidden size={16} />
            Notifications
          </Button>
        )}
      />
      <PopoverPositioner>
        <PopoverContent>
          <Stack gap="1">
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
          </Stack>
          <div class={styles.footer}>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}