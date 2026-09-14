import { Menu } from '@moduix/solid/menu';
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
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="open-new-tab">Open in New Tab</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}