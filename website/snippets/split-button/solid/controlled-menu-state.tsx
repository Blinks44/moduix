import { MenuItem, MenuSeparator } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';
import { createSignal } from 'solid-js';

export default function ControlledSplitButton() {
  const [open, setOpen] = createSignal(false);

  return (
    <SplitButton
      aria-label="Share actions"
      open={open()}
      onOpenChange={(details) => setOpen(details.open)}
      variant="outline"
    >
      <SplitButtonAction>Share</SplitButtonAction>
      <SplitButtonTrigger aria-label="More share actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="copy-link">Copy Link</MenuItem>
          <MenuItem value="invite-email">Invite by Email</MenuItem>
          <MenuSeparator />
          <MenuItem value="close-menu" onSelect={() => setOpen(false)}>
            Close Menu
          </MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}
