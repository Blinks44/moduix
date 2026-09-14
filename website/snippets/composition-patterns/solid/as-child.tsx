import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';

export function FiltersPopover() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger
        asChild={(props) => (
          <Button {...props()} variant="outline">
            Filters
          </Button>
        )}
      />
      <Popover.Positioner>
        <Popover.Content>Choose one or more filters.</Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}