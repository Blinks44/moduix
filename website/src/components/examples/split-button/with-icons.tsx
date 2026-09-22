import { MenuItem, MenuSeparator } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import { Plus as PlusIcon } from 'lucide-react';

export default function SplitButtonIconsDemo() {
  return (
    <SplitButton aria-label="Create actions">
      <SplitButtonAction>
        <PlusIcon />
        Create Item
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More create actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="create-blank">Create Blank</MenuItem>
          <MenuItem value="create-template">Create From Template</MenuItem>
          <MenuSeparator />
          <MenuItem value="import-existing">Import Existing</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}
