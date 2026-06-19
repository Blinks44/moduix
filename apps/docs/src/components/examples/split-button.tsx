import {
  ArrowUpRightIcon,
  Menu,
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
        <Menu.Item value="save-draft">Save as Draft</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="publish">Publish Now</Menu.Item>
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
          <Menu.Item value="default-edit">Edit</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="outline">
        <SplitButtonAction>Outline</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="outline-edit">Edit</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="secondary">
        <SplitButtonAction>Secondary</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="secondary-edit">Edit</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="destructive">
        <SplitButtonAction>Destructive</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="delete">Delete</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="ghost">
        <SplitButtonAction>Ghost</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="ghost-edit">Edit</Menu.Item>
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
          <Menu.Item value="xs-create">Create</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="sm" variant="outline">
        <SplitButtonAction>Small</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="sm-create">Create</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="md" variant="outline">
        <SplitButtonAction>Medium</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="md-create">Create</Menu.Item>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="lg" variant="outline">
        <SplitButtonAction>Large</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <Menu.Item value="lg-create">Create</Menu.Item>
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
        <Menu.Item value="create-blank">Create Blank</Menu.Item>
        <Menu.Item value="create-template">Create From Template</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="import-existing">Import Existing</Menu.Item>
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
        <Menu.Item value="copy-link">Copy Link</Menu.Item>
        <Menu.Item value="invite-email">Invite by Email</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="close-menu" onSelect={() => setOpen(false)}>
          Close Menu
        </Menu.Item>
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
        <Menu.Item value="approve">Approve</Menu.Item>
        <Menu.Item value="request-changes">Request Changes</Menu.Item>
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
        <Menu.Item value="copy-link">Copy Link</Menu.Item>
        <Menu.Item value="open-new-tab">Open in New Tab</Menu.Item>
      </SplitButtonContent>
    </SplitButton>
  );
}