import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';

// Anatomy scene: the popover stays open and inline so every part can be outlined.
export default function PopoverAnatomy() {
  return (
    <div
      style={{
        minHeight: 244,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Popover open portalled={false} positioning={{ gutter: 8 }}>
        <PopoverAnchor>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Notifications
              <PopoverIndicator />
            </Button>
          </PopoverTrigger>
        </PopoverAnchor>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverCloseIcon />
              <PopoverDescription>You are all caught up.</PopoverDescription>
            </PopoverHeader>
            <PopoverBody>New mentions will show up here.</PopoverBody>
            <PopoverFooter>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  );
}