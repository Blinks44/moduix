import { Button, Popover } from '@moduix/react';

export default function SameWidthPopoverDemo() {
  return (
    <Popover
      positioning={{
        sameWidth: true,
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button style={{ inlineSize: 'min(20rem, 100%)' }}>Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content style={{ width: 'var(--reference-width)', minWidth: 0 }}>
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark's reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}