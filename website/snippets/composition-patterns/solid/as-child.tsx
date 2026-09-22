import { Button } from '@moduix/solid/button';
import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from '@moduix/solid/popover';

export function FiltersPopover() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger
        asChild={(props) => (
          <Button {...props()} variant="outline">
            Filters
          </Button>
        )}
      />
      <PopoverPositioner>
        <PopoverContent>Choose one or more filters.</PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}