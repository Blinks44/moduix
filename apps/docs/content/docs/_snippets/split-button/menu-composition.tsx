/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, SplitButton } from '@moduix/react';

export function SplitButtonMenuCompositionDemo() {
  return (
    <SplitButton variant="outline">
      <SplitButton.Action>Copy</SplitButton.Action>
      <SplitButton.Trigger aria-label="More copy actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Clipboard</Menu.ItemGroupLabel>
            <Menu.Item value="copy">Copy</Menu.Item>
            <Menu.Item value="duplicate">Duplicate</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Export</Menu.ItemGroupLabel>
            <Menu.Item value="export-pdf">Export PDF</Menu.Item>
            <Menu.Item value="export-csv">Export CSV</Menu.Item>
          </Menu.ItemGroup>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

//#endregion