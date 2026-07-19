/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';

export function AdvancedCustomizationPopoverDemo() {
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
          <Popover.Arrow className="customArrow">
            <Popover.ArrowTip />
          </Popover.Arrow>
          <div className="customHeader">
            <Popover.Title>Custom layout</Popover.Title>
            <Popover.CloseIcon />
          </div>
          <Popover.Description>
            Compose Ark parts directly when the layout helpers do not fit your content.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

//#endregion