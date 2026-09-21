import { MenuItem, MenuSeparator } from '@moduix/solid/menu';
import { SplitButton } from '@moduix/solid/split-button';
import { Plus as PlusIcon } from 'lucide-solid';

export default function SplitButtonIconsDemo() {
  return (
    <SplitButton aria-label="Create actions">
      <SplitButton.Action>
        <PlusIcon />
        Create Item
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More create actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="create-blank">Create Blank</MenuItem>
          <MenuItem value="create-template">Create From Template</MenuItem>
          <MenuSeparator />
          <MenuItem value="import-existing">Import Existing</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
