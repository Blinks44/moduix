import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';
import { Bell as BellIcon } from 'lucide-react';

export default function PopoverDemo() {
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
          <PopoverHeader>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}