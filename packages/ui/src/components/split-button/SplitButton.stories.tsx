import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { MenuItem, MenuSeparator } from '../menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonTrigger,
} from './SplitButton';
import styles from './SplitButton.stories.module.css';

const meta = {
  title: 'Components/SplitButton',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Basic: Story = {
  render: () => (
    <SplitButton>
      <SplitButtonAction onClick={() => undefined}>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonContent>
        <MenuItem value="save-draft">Save as Draft</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem value="publish">Publish Now</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      {variants.map((variant) => (
        <SplitButton key={variant} variant={variant}>
          <SplitButtonAction>{variant}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonContent>
            <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
            <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
          </SplitButtonContent>
        </SplitButton>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      {sizes.map((size) => (
        <SplitButton key={size} size={size} variant="outline">
          <SplitButtonAction>{size}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonContent>
            <MenuItem value={`${size}-create`}>Create</MenuItem>
            <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
          </SplitButtonContent>
        </SplitButton>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
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
  ),
};

export const ControlledMenu: Story = {
  render: () => {
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
  },
};

export const LinkAction: Story = {
  render: () => (
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
  ),
};