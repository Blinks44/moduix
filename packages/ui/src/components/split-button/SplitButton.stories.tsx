import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Menu } from '../menu';
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
        <Menu.Item value="save-draft">Save as Draft</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="publish">Publish Now</Menu.Item>
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
            <Menu.Item value={`${variant}-edit`}>Edit</Menu.Item>
            <Menu.Item value={`${variant}-duplicate`}>Duplicate</Menu.Item>
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
            <Menu.Item value={`${size}-create`}>Create</Menu.Item>
            <Menu.Item value={`${size}-create-open`}>Create and Open</Menu.Item>
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
        <Menu.Item value="create-blank">Create Blank</Menu.Item>
        <Menu.Item value="create-template">Create From Template</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="import-existing">Import Existing</Menu.Item>
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
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="invite-email">Invite by Email</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="close-menu" onSelect={() => setOpen(false)}>
            Close Menu
          </Menu.Item>
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
        <Menu.Item value="copy-link">Copy Link</Menu.Item>
        <Menu.Item value="open-new-tab">Open in New Tab</Menu.Item>
      </SplitButtonContent>
    </SplitButton>
  ),
};