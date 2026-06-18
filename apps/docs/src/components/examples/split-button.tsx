import {
  ArrowUpRightIcon,
  MenuItem,
  MenuSeparator,
  PlusIcon,
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonTrigger,
} from 'moduix';
import { useState } from 'react';
import styles from './split-button.module.css';

export function SplitButtonExample() {
  return (
    <SplitButton>
      <SplitButtonAction>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem value="publish">Publish Now</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonVariantsExample() {
  return (
    <div className={styles.row}>
      <SplitButton>
        <SplitButtonAction>Default</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="default-edit">Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="outline">
        <SplitButtonAction>Outline</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="outline-edit">Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="secondary">
        <SplitButtonAction>Secondary</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="secondary-edit">Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="destructive">
        <SplitButtonAction>Destructive</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="delete">Delete</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="ghost">
        <SplitButtonAction>Ghost</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="ghost-edit">Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
    </div>
  );
}

export function SplitButtonSizesExample() {
  return (
    <div className={styles.row}>
      <SplitButton size="xs" variant="outline">
        <SplitButtonAction>Extra-small</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="xs-create">Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="sm" variant="outline">
        <SplitButtonAction>Small</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="sm-create">Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="md" variant="outline">
        <SplitButtonAction>Medium</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="md-create">Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="lg" variant="outline">
        <SplitButtonAction>Large</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem value="lg-create">Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
    </div>
  );
}

export function SplitButtonIconExample() {
  return (
    <SplitButton>
      <SplitButtonAction>
        <PlusIcon />
        Create Item
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More create actions" />
      <SplitButtonContent>
        <MenuItem value="create-blank">Create Blank</MenuItem>
        <MenuItem value="create-template">Create From Template</MenuItem>
        <MenuSeparator />
        <MenuItem value="import-existing">Import Existing</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <SplitButton open={open} onOpenChange={(details) => setOpen(details.open)} variant="outline">
      <SplitButtonAction>Share</SplitButtonAction>
      <SplitButtonTrigger aria-label="More share actions" />
      <SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="invite-email">Invite by Email</MenuItem>
        <MenuSeparator />
        <MenuItem value="close-menu" onSelect={() => setOpen(false)}>
          Close Menu
        </MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonStylingExample() {
  return (
    <SplitButton className={styles.brandSplitButton} variant="outline">
      <SplitButtonAction>Review</SplitButtonAction>
      <SplitButtonTrigger aria-label="More review actions" />
      <SplitButtonContent>
        <MenuItem value="approve">Approve</MenuItem>
        <MenuItem value="request-changes">Request Changes</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonLinkActionExample() {
  return (
    <SplitButton variant="outline">
      <SplitButtonAction asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More docs actions" />
      <SplitButtonContent>
        <MenuItem value="copy-link">Copy Link</MenuItem>
        <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}