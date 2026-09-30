import { ArrowUpRight as ArrowUpRightIcon } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { MenuItem, MenuSeparator, MenuItemGroup, MenuItemGroupLabel } from '@/components/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@/components/split-button';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './SplitButton.stories.module.css';

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SplitButton>;
export default meta;
type Story = StoryObj<typeof meta>;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
] as const;
const components = {
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
  MenuItem,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
  PlusIcon,
  ArrowUpRightIcon,
};
const renderStory = (template: string) => () => ({
  components,
  setup() {
    return { styles, sizes, variants, open: ref(false) };
  },
  template,
});

export const Basic: Story = {
  render: renderStory(`
<SplitButton aria-label="Save actions">
    <SplitButtonAction @click="() => undefined">Save Changes</SplitButtonAction>
    <SplitButtonTrigger />
    <SplitButtonPositioner><SplitButtonContent>
      <MenuItem value="save-draft">Save as Draft</MenuItem>
      <MenuItem value="duplicate">Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem value="publish">Publish Now</MenuItem>
    </SplitButtonContent></SplitButtonPositioner>
  </SplitButton>
  `),
};

export const Variants: Story = {
  render: renderStory(`
<div :class="styles.row">
  <SplitButton v-for="variant in variants" :key="variant" :aria-label="\`\${variant} actions\`" :variant="variant">
    <SplitButtonAction>{{ variant }}</SplitButtonAction><SplitButtonTrigger />
    <SplitButtonPositioner><SplitButtonContent>
      <MenuItem :value="\`\${variant}-edit\`">Edit</MenuItem>
      <MenuItem :value="\`\${variant}-duplicate\`">Duplicate</MenuItem>
    </SplitButtonContent></SplitButtonPositioner>
  </SplitButton>
</div>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
<div :class="styles.row">
  <SplitButton v-for="size in sizes" :key="size" :aria-label="\`\${size} create actions\`" :size="size" variant="outline">
    <SplitButtonAction>{{ size }}</SplitButtonAction><SplitButtonTrigger />
    <SplitButtonPositioner><SplitButtonContent>
      <MenuItem :value="\`\${size}-create\`">Create</MenuItem>
      <MenuItem :value="\`\${size}-create-open\`">Create and Open</MenuItem>
    </SplitButtonContent></SplitButtonPositioner>
  </SplitButton>
</div>
  `),
};

export const WithIcons: Story = {
  render: renderStory(`
<SplitButton aria-label="Create actions">
  <SplitButtonAction><PlusIcon />Create Item</SplitButtonAction>
  <SplitButtonTrigger aria-label="More create actions" />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItem value="create-blank">Create Blank</MenuItem><MenuItem value="create-template">Create From Template</MenuItem>
    <MenuSeparator /><MenuItem value="import-existing">Import Existing</MenuItem>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};

export const DisabledAction: Story = {
  render: renderStory(`
<SplitButton aria-label="Save actions">
  <SplitButtonAction disabled>Save Changes</SplitButtonAction>
  <SplitButtonTrigger />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItem value="save-draft">Save as Draft</MenuItem>
    <MenuItem value="duplicate">Duplicate</MenuItem>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};

export const DisabledTrigger: Story = {
  render: renderStory(`
<SplitButton aria-label="Save actions">
  <SplitButtonAction>Save Changes</SplitButtonAction>
  <SplitButtonTrigger disabled aria-label="More save actions" />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItem value="save-draft">Save as Draft</MenuItem>
    <MenuItem value="duplicate">Duplicate</MenuItem>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};

export const ControlledMenu: Story = {
  render: renderStory(`
<SplitButton aria-label="Share actions" :open="open" @open-change="open = $event.open" variant="outline">
  <SplitButtonAction>Share</SplitButtonAction>
  <SplitButtonTrigger aria-label="More share actions" />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItem value="copy-link">Copy Link</MenuItem>
    <MenuItem value="invite-email">Invite by Email</MenuItem>
    <MenuSeparator />
    <MenuItem value="close-menu" @select="open = false">Close Menu</MenuItem>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};

export const MenuComposition: Story = {
  render: renderStory(`
<SplitButton aria-label="Copy and export actions" variant="outline">
  <SplitButtonAction>Copy</SplitButtonAction>
  <SplitButtonTrigger aria-label="More copy actions" />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItemGroup><MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
      <MenuItem value="copy">Copy</MenuItem><MenuItem value="duplicate">Duplicate</MenuItem>
    </MenuItemGroup>
    <MenuSeparator />
    <MenuItemGroup><MenuItemGroupLabel>Export</MenuItemGroupLabel>
      <MenuItem value="export-pdf">Export PDF</MenuItem><MenuItem value="export-csv">Export CSV</MenuItem>
    </MenuItemGroup>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};

export const LinkAction: Story = {
  render: renderStory(`
<SplitButton aria-label="Documentation actions" variant="outline">
  <SplitButtonAction as-child><a href="#split-button">Open Docs<ArrowUpRightIcon aria-hidden="true" focusable="false" /></a></SplitButtonAction>
  <SplitButtonTrigger aria-label="More docs actions" />
  <SplitButtonPositioner><SplitButtonContent>
    <MenuItem value="copy-link">Copy Link</MenuItem>
    <MenuItem value="open-new-tab">Open in New Tab</MenuItem>
  </SplitButtonContent></SplitButtonPositioner>
</SplitButton>
  `),
};