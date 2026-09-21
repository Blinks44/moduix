import { MenuItem } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';

export default function SplitButtonPositioningDemo() {
  return (
    <SplitButton
      aria-label="Export actions"
      positioning={{
        placement: 'bottom-start',
        gutter: 8,
      }}
      variant="outline"
    >
      <SplitButton.Action>Export</SplitButton.Action>
      <SplitButton.Trigger aria-label="More export actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="export-pdf">Export PDF</MenuItem>
          <MenuItem value="export-csv">Export CSV</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
