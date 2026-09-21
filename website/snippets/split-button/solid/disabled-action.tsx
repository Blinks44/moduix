import { MenuItem } from '@moduix/solid/menu';
import { SplitButton } from '@moduix/solid/split-button';

export default function SplitButtonDisabledActionDemo() {
  return (
    <SplitButton aria-label="Save actions">
      <SplitButton.Action disabled>Save Changes</SplitButton.Action>
      <SplitButton.Trigger aria-label="More save actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
