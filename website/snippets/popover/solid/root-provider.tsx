import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/popover';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderDemo() {
  const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

  return (
    <Stack align="center" gap="3">
      <PopoverRootProvider value={popover}>
        <PopoverTrigger asChild={(props) => <Button {...props()}>Open from trigger</Button>} />
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
        <output>Open: {popover().open ? 'yes' : 'no'}</output>
        <Button size="sm" onClick={() => popover().setOpen(!popover().open)}>
          Toggle externally
        </Button>
      </div>
    </Stack>
  );
}