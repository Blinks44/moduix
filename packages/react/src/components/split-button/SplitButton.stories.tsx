import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowUpRightIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Menu } from '../menu';
import { SplitButton } from './SplitButton';
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
      <SplitButton.Action onClick={() => undefined}>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="save-draft">Save as Draft</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="publish">Publish Now</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      {variants.map((variant) => (
        <SplitButton key={variant} variant={variant}>
          <SplitButton.Action>{variant}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${variant}-edit`}>Edit</Menu.Item>
              <Menu.Item value={`${variant}-duplicate`}>Duplicate</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
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
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${size}-create`}>Create</Menu.Item>
              <Menu.Item value={`${size}-create-open`}>Create and Open</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <SplitButton>
      <SplitButton.Action>
        <PlusIcon />
        Create Item
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More create actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="create-blank">Create Blank</Menu.Item>
          <Menu.Item value="create-template">Create From Template</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="import-existing">Import Existing</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const ControlledMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <SplitButton open={open} onOpenChange={(details) => setOpen(details.open)} variant="outline">
        <SplitButton.Action>Share</SplitButton.Action>
        <SplitButton.Trigger aria-label="More share actions" />
        <SplitButton.Positioner>
          <SplitButton.Content>
            <Menu.Item value="copy-link">Copy Link</Menu.Item>
            <Menu.Item value="invite-email">Invite by Email</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="close-menu" onSelect={() => setOpen(false)}>
              Close Menu
            </Menu.Item>
          </SplitButton.Content>
        </SplitButton.Positioner>
      </SplitButton>
    );
  },
};

export const MenuComposition: Story = {
  render: () => (
    <SplitButton variant="outline">
      <SplitButton.Action>Copy</SplitButton.Action>
      <SplitButton.Trigger aria-label="More copy actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Clipboard</Menu.ItemGroupLabel>
            <Menu.Item value="copy">Copy</Menu.Item>
            <Menu.Item value="duplicate">Duplicate</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Export</Menu.ItemGroupLabel>
            <Menu.Item value="export-pdf">Export PDF</Menu.Item>
            <Menu.Item value="export-csv">Export CSV</Menu.Item>
          </Menu.ItemGroup>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const LinkAction: Story = {
  render: () => (
    <SplitButton variant="outline">
      <SplitButton.Action asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More docs actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="copy-link">Copy Link</Menu.Item>
          <Menu.Item value="open-new-tab">Open in New Tab</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};