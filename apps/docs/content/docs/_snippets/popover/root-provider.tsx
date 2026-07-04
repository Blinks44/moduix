/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover, usePopover } from '@moduix/react';

const placement = 'bottom-start';

export function RootProviderDemo() {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
      gutter: 8,
    },
  });
  return (
    <div className="stack">
      <span>Popover is {popover.open ? 'open' : 'closed'}</span>
      <Button onClick={() => popover.setOpen(!popover.open)}>Toggle externally</Button>
      <Popover.RootProvider value={popover}>
        <Popover.Trigger asChild>
          <Button>Open from trigger</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>External state</Popover.Title>
              <Popover.Description>
                The usePopover hook owns this popover state.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.RootProvider>
    </div>
  );
}

//#endregion