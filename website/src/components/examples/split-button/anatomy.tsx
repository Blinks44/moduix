import { MenuItem, MenuSeparator } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';

// Anatomy scene: the menu stays open and inline so every part can be outlined.
export default function SplitButtonAnatomy() {
  return (
    <div
      style={{
        minHeight: 220,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <SplitButton aria-label="Save actions" open portalled={false}>
        <SplitButtonAction>Save Changes</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonPositioner>
          <SplitButtonContent>
            <MenuItem value="save-draft">Save as Draft</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem value="publish">Publish Now</MenuItem>
          </SplitButtonContent>
        </SplitButtonPositioner>
      </SplitButton>
    </div>
  );
}