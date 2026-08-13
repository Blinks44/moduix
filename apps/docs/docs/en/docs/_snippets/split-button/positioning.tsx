import { Menu } from '@moduix/react/menu';
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
          <Menu.Item value="export-pdf">Export PDF</Menu.Item>
          <Menu.Item value="export-csv">Export CSV</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}