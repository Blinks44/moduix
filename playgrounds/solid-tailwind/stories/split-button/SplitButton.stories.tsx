import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@/components/menu/Menu';
import { SplitButton } from '@/components/split-button/SplitButton';
import { PlusIcon } from '@/lib/moduix/icons/ui';

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...decorativeSvgProps}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
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
} satisfies Meta<typeof SplitButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex flex-wrap items-center justify-center gap-3';
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
      <SplitButton.Action onClick={() => undefined}>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem value="publish">Publish Now</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const Variants: Story = {
  render: () => (
    <div class={rowClass}>
      {variants.map((variant) => (
        <SplitButton aria-label={`${variant} actions`} variant={variant}>
          <SplitButton.Action>{variant}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <MenuItem value={`${variant}-edit`}>Edit</MenuItem>
              <MenuItem value={`${variant}-duplicate`}>Duplicate</MenuItem>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={rowClass}>
      {sizes.map((size) => (
        <SplitButton aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <MenuItem value={`${size}-create`}>Create</MenuItem>
              <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <SplitButton aria-label="Create actions">
      <SplitButton.Action>
        <PlusIcon />
        Create Item
      </SplitButton.Action>
      <SplitButton.Trigger aria-label="More create actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="create-blank">Create Blank</MenuItem>
          <MenuItem value="create-template">Create From Template</MenuItem>
          <MenuSeparator />
          <MenuItem value="import-existing">Import Existing</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const DisabledAction: Story = {
  render: () => (
    <SplitButton aria-label="Save actions">
      <SplitButton.Action disabled>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <SplitButton aria-label="Save actions">
      <SplitButton.Action>Save Changes</SplitButton.Action>
      <SplitButton.Trigger disabled aria-label="More save actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const ControlledMenu: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <SplitButton
        aria-label="Share actions"
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
        variant="outline"
      >
        <SplitButton.Action>Share</SplitButton.Action>
        <SplitButton.Trigger aria-label="More share actions" />
        <SplitButton.Positioner>
          <SplitButton.Content>
            <MenuItem value="copy-link">Copy Link</MenuItem>
            <MenuItem value="invite-email">Invite by Email</MenuItem>
            <MenuSeparator />
            <MenuItem value="close-menu" onSelect={() => setOpen(false)}>
              Close Menu
            </MenuItem>
          </SplitButton.Content>
        </SplitButton.Positioner>
      </SplitButton>
    );
  },
};

export const MenuComposition: Story = {
  render: () => (
    <SplitButton aria-label="Copy and export actions" variant="outline">
      <SplitButton.Action>Copy</SplitButton.Action>
      <SplitButton.Trigger aria-label="More copy actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
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
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};

export const LinkAction: Story = {
  render: () => (
    <SplitButton aria-label="Documentation actions" variant="outline">
      <SplitButton.Action
        asChild={(props) => (
          <a {...props()} href="#split-button">
            Open Docs
            <ArrowUpRightIcon />
          </a>
        )}
      />
      <SplitButton.Trigger aria-label="More docs actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <MenuItem value="copy-link">Copy Link</MenuItem>
          <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  ),
};
