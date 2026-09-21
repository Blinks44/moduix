import { MenuItem } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';
import { ArrowUpRight as ArrowUpRightIcon } from 'lucide-react';

export default function SplitButtonLinkActionDemo() {
  return (
    <SplitButton aria-label="Documentation actions" variant="outline">
      <SplitButton.Action asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More docs actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="copy-link">Copy Link</MenuItem>
          <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}
