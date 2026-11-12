import { Button } from '@moduix/react/button';
import {
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
} from '@moduix/react/popover';
import { Stack } from '@moduix/react/stack';

export default function RootProviderDemo() {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
      gutter: 8,
    },
  });
  return (
    <Stack align="center" gap="3">
      <PopoverRootProvider value={popover}>
        <PopoverTrigger asChild>
          <Button>Open from trigger</Button>
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>External state</PopoverTitle>
              <PopoverDescription>The usePopover hook owns this popover state.</PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRootProvider>
      <div data-preview-meta>
        <output>Open: {popover.open ? 'yes' : 'no'}</output>
        <Button size="sm" onClick={() => popover.setOpen(!popover.open)}>
          Toggle externally
        </Button>
      </div>
    </Stack>
  );
}