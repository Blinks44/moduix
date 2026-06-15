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
        <MenuItem closeOnClick>Save as Draft</MenuItem>
        <MenuItem closeOnClick>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Publish Now</MenuItem>
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
          <MenuItem closeOnClick>Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="outline">
        <SplitButtonAction>Outline</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="secondary">
        <SplitButtonAction>Secondary</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Edit</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="destructive">
        <SplitButtonAction>Destructive</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Delete</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton variant="ghost">
        <SplitButtonAction>Ghost</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Edit</MenuItem>
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
          <MenuItem closeOnClick>Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="sm" variant="outline">
        <SplitButtonAction>Small</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="md" variant="outline">
        <SplitButtonAction>Medium</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Create</MenuItem>
        </SplitButtonContent>
      </SplitButton>
      <SplitButton size="lg" variant="outline">
        <SplitButtonAction>Large</SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonContent>
          <MenuItem closeOnClick>Create</MenuItem>
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
        <MenuItem closeOnClick>Create Blank</MenuItem>
        <MenuItem closeOnClick>Create From Template</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Import Existing</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <SplitButton open={open} onOpenChange={setOpen} variant="outline">
      <SplitButtonAction>Share</SplitButtonAction>
      <SplitButtonTrigger aria-label="More share actions" />
      <SplitButtonContent>
        <MenuItem closeOnClick>Copy Link</MenuItem>
        <MenuItem closeOnClick>Invite by Email</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick onClick={() => setOpen(false)}>
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
        <MenuItem closeOnClick>Approve</MenuItem>
        <MenuItem closeOnClick>Request Changes</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}

export function SplitButtonLinkActionExample() {
  return (
    <SplitButton variant="outline">
      <SplitButtonAction render={<a href="#split-button" />} nativeButton={false}>
        Open Docs
        <ArrowUpRightIcon />
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More docs actions" />
      <SplitButtonContent>
        <MenuItem closeOnClick>Copy Link</MenuItem>
        <MenuItem closeOnClick>Open in New Tab</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  );
}