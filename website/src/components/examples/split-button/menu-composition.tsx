import { MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';

export default function SplitButtonMenuCompositionDemo() {
  return (
    <SplitButton aria-label="Copy and export actions" variant="outline">
      <SplitButton.Action>Copy</SplitButton.Action>
      <SplitButton.Trigger aria-label="More copy actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItemGroup>
            <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            <MenuItemGroupLabel>Export</MenuItemGroupLabel>
            <MenuItem value="export-pdf">Export PDF</MenuItem>
            <MenuItem value="export-csv">Export CSV</MenuItem>
          </MenuItemGroup>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
