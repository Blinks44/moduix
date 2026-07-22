import { Button, Popover } from '@moduix/react';

export default function AdvancedCustomizationPopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open custom popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <div className="customHeader">
            <Popover.Title>Custom layout</Popover.Title>
            <Popover.CloseIcon />
          </div>
          <Popover.Description>
            Compose Ark parts directly and replace the standard arrow when the layout calls for a
            clean anchored panel.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}