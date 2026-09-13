import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';

export function FiltersPopover() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button variant="outline">Filters</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>Choose one or more filters.</Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}