import { MenuItem, MenuSeparator } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import { useState } from 'react';

export default function ControlledSplitButton() {
  const [open, setOpen] = useState(false);
  return (
    <SplitButton
      aria-label="Share actions"
      open={open}
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