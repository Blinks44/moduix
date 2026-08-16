import { Button } from '@moduix/react/button';
import { Input } from '@moduix/react/input';
import { Popover } from '@moduix/react/popover';

export default function AnchorPopoverDemo() {
  return (
    <div
      style={{
        display: 'grid',
        inlineSize: 'min(20rem, 100%)',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-2)',
      }}
    >
      <Popover
        positioning={{
          gutter: 8,
        }}
      >
        <Popover.Anchor asChild>
          <Input placeholder="Popover anchor" />
        </Popover.Anchor>
        <Popover.Trigger asChild>
          <Button>Open below the input</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Custom anchor</Popover.Title>
              <Popover.Description>
                The popup is positioned relative to the input instead of the trigger.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}