import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@/components/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@/components/split-button/SplitButton';
import { PlusIcon } from '@/lib/moduix/icons/ui';

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/SplitButton',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClassName = 'flex flex-wrap items-center justify-center gap-3';
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
    <SplitButton aria-label="Save actions">
      <SplitButtonAction onClick={() => undefined}>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem value="publish">Publish Now</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={rowClassName}>
      {variants.map((variant) => (
        <SplitButton key={variant} aria-label={`${variant} actions`} variant={variant}>
          <SplitButtonAction>{variant}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonPositioner>
            <SplitButtonContent>
              <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
              <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
            </SplitButtonContent>
          </SplitButtonPositioner>
        </SplitButton>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={rowClassName}>
      {sizes.map((size) => (
        <SplitButton key={size} aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButtonAction>{size}</SplitButtonAction>
          <SplitButtonTrigger />
          <SplitButtonPositioner>
            <SplitButtonContent>
              <MenuItem value={`${size}-create`}>Create</MenuItem>
              <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
            </SplitButtonContent>
          </SplitButtonPositioner>
        </SplitButton>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <SplitButton aria-label="Create actions">
      <SplitButtonAction>
        <PlusIcon />
        Create Item
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More create actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="create-blank">Create Blank</MenuItem>
          <MenuItem value="create-template">Create From Template</MenuItem>
          <MenuSeparator />
          <MenuItem value="import-existing">Import Existing</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};

export const DisabledAction: Story = {
  render: () => (
    <SplitButton aria-label="Save actions">
      <SplitButtonAction disabled>Save Changes</SplitButtonAction>
      <SplitButtonTrigger />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <SplitButton aria-label="Save actions">
      <SplitButtonAction>Save Changes</SplitButtonAction>
      <SplitButtonTrigger disabled aria-label="More save actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};

export const ControlledMenu: Story = {
  render: () => {
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
  },
};

export const MenuComposition: Story = {
  render: () => (
    <SplitButton aria-label="Copy and export actions" variant="outline">
      <SplitButtonAction>Copy</SplitButtonAction>
      <SplitButtonTrigger aria-label="More copy actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItemGroup>
            <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            <MenuItemGroupLabel>Export</MenuItemGroupLabel>
            <MenuItem value="export-pdf">Export PDF</MenuItem>
            <MenuItem value="export-csv">Export CSV</MenuItem>
          </MenuItemGroup>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};

export const LinkAction: Story = {
  render: () => (
    <SplitButton aria-label="Documentation actions" variant="outline">
      <SplitButtonAction asChild>
        <a href="#split-button">
          Open Docs
          <ArrowUpRightIcon />
        </a>
      </SplitButtonAction>
      <SplitButtonTrigger aria-label="More docs actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="copy-link">Copy Link</MenuItem>
          <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  ),
};