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
          <div className={styles.header}>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
          </div>
          <div className={styles.footer}>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}