import { MenuItem } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';

export default function SplitButtonDisabledActionDemo() {
  return (
    <SplitButton aria-label="Save actions">
      <SplitButtonAction disabled>Save Changes</SplitButtonAction>
      <SplitButtonTrigger aria-label="More save actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}
