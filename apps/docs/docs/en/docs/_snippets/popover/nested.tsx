import { Button, Popover } from '@moduix/react';

export default function NestedPopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>Open settings</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Settings</Popover.Title>
            <Popover.Description>Nested popovers keep independent state.</Popover.Description>
          </Popover.Header>
          <Popover.Body className="nestedBody">
            <Popover
              portalled={false}
              positioning={{
                placement: 'right',
                gutter: 8,
              }}
            >
              <Popover.Trigger asChild>
                <Button>Advanced</Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Header>
                    <Popover.Title>Advanced settings</Popover.Title>
                    <Popover.Description>
                      This content belongs to the nested popover.
                    </Popover.Description>
                  </Popover.Header>
                  <Popover.Footer>
                    <Popover.CloseTrigger>Close</Popover.CloseTrigger>
                  </Popover.Footer>
                </Popover.Content>
              </Popover.Positioner>
            </Popover>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}