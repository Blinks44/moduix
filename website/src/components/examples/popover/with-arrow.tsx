import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverArrow,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';

export default function PopoverWithArrowDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <PopoverTrigger asChild>
        <Button>Open with arrow</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <PopoverTitle>With arrow</PopoverTitle>
            <PopoverDescription>
              Arrow and ArrowTip use Ark positioning variables.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}