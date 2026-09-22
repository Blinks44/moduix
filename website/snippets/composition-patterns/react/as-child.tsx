import { Button } from '@moduix/react/button';
import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from '@moduix/react/popover';

export function FiltersPopover() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filters</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>Choose one or more filters.</PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}