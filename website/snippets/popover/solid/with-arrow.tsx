import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';

export default function PopoverWithArrowDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open with arrow</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Header>
            <Popover.Title>With arrow</Popover.Title>
            <Popover.Description>
              Arrow and ArrowTip use Ark positioning variables.
            </Popover.Description>
          </Popover.Header>
          <Popover.Footer>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}