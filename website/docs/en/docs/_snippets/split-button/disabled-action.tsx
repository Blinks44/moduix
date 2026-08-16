import { Menu } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';

export default function SplitButtonDisabledActionDemo() {
  return (
    <SplitButton aria-label="Save actions">
      <SplitButton.Action disabled>Save Changes</SplitButton.Action>
      <SplitButton.Trigger aria-label="More save actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="save-draft">Save as Draft</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}