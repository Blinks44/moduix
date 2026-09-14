import { Menu } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';
import { Plus as PlusIcon } from 'lucide-react';

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
          <Menu.Item value="create-blank">Create Blank</Menu.Item>
          <Menu.Item value="create-template">Create From Template</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="import-existing">Import Existing</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}