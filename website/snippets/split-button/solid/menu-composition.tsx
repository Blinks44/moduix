import { MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';

export default function SplitButtonMenuCompositionDemo() {
  return (
    <SplitButton aria-label="Copy and export actions" variant="outline">
      <SplitButtonAction>Copy</SplitButtonAction>
      <SplitButtonTrigger aria-label="More copy actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
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
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}
