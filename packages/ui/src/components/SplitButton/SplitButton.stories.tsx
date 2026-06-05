import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@/icons/demo';
import { PlusIcon } from '@/icons/ui';
import { MenuItem, MenuSeparator } from '../Menu';
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
        <MenuItem closeOnClick>Save as Draft</MenuItem>
        <MenuItem closeOnClick>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Publish Now</MenuItem>
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
            <MenuItem closeOnClick>Edit</MenuItem>
            <MenuItem closeOnClick>Duplicate</MenuItem>
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
            <MenuItem closeOnClick>Create</MenuItem>
            <MenuItem closeOnClick>Create and Open</MenuItem>
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
        <MenuItem closeOnClick>Create Blank</MenuItem>
        <MenuItem closeOnClick>Create From Template</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick>Import Existing</MenuItem>
      </SplitButtonContent>
    </SplitButton>
  ),
};

export const ControlledMenu: Story = {
  render: () => {
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
  },
};

export const LinkAction: Story = {
  render: () => (
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
  ),
};