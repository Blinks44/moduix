import { MenuItem } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import { ArrowUpRight as ArrowUpRightIcon } from 'lucide-react';

export default function SplitButtonLinkActionDemo() {
  return (
    <SplitButton aria-label="Documentation actions" variant="outline">
      <SplitButtonAction asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More docs actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="copy-link">Copy Link</MenuItem>
          <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}