import { MenuItem } from '@moduix/solid/menu';
import { SplitButton } from '@moduix/solid/split-button';
import { ArrowUpRight as ArrowUpRightIcon } from 'lucide-solid';

export default function SplitButtonLinkActionDemo() {
  return (
    <SplitButton aria-label="Documentation actions" variant="outline">
      <SplitButton.Action
        asChild={(props) => (
          <a {...props()} href="#split-button">
            Open Docs
            <ArrowUpRightIcon />
          </a>
        )}
      />
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
