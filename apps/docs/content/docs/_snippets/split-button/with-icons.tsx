/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, PlusIcon, SplitButton } from '@moduix/react';

export function SplitButtonIconsDemo() {
  return (
    <SplitButton>
      <SplitButton.Action>
        <PlusIcon />
        Create Item
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More create actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="create-blank">Create Blank</Menu.Item>
          <Menu.Item value="create-template">Create From Template</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="import-existing">Import Existing</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

//#endregion