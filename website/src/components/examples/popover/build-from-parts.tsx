import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import { Stack } from '@moduix/react/stack';
import { Bell as BellIcon } from 'lucide-react';
import styles from '@/components/examples/popover/popover-build-from-parts.module.css';

export default function BuildFromPartsPopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <PopoverTrigger asChild>
        <Button>
          <BellIcon aria-hidden size={16} />
          Notifications
        </Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <Stack gap="1">
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
          </Stack>
          <div className={styles.footer}>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}