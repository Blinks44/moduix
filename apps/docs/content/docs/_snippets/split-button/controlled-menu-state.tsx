/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, SplitButton } from '@moduix/react';
import { useState } from 'react';

export function ControlledSplitButton() {
  const [open, setOpen] = useState(false);
  return (
    <SplitButton open={open} onOpenChange={(details) => setOpen(details.open)} variant="outline">
      <SplitButton.Action>Share</SplitButton.Action>
      <SplitButton.Trigger aria-label="More share actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="invite-email">Invite by Email</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="close-menu" onSelect={() => setOpen(false)}>
            Close Menu
          </Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

//#endregion