import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { List, ListItem } from '@/components/list';

const demoRootClass = 'w-full max-w-lg';
const accentListClass = 'w-full max-w-lg ps-6';
const accentItemClass = 'marker:font-semibold marker:text-primary';
const rowListClass = 'w-full max-w-lg flex-row flex-wrap';
const stackClass = 'flex w-full max-w-lg flex-col gap-6';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with Tailwind utilities or native ::marker selectors.',
];

const AccentListItem = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    return { accentItemClass, attrs };
  },
  template: `<li v-bind="attrs" :class="[accentItemClass, attrs.class]"><slot /></li>`,
});

const ReleaseList = defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    return { attrs };
  },
  template: `<ul v-bind="attrs"><slot /></ul>`,
});

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    gap: 'sm',
    size: 'md',
    tone: 'default',
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = { AccentListItem, List, ListItem, ReleaseList };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { defaultItems, demoRootClass, accentListClass, rowListClass, stackClass };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <List :class="demoRootClass">
      <ListItem v-for="item in defaultItems" :key="item">{{ item }}</ListItem>
    </List>
  `),
};

export const Ordered: Story = {
  render: renderStory(`
    <List as="ol" :start="3" :class="demoRootClass">
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  `),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: renderStory(`
    <List as="ol" type="A" :class="demoRootClass">
      <ListItem>Draft the rollout checklist.</ListItem>
      <ListItem>Coordinate the release window.</ListItem>
      <ListItem>Confirm the post-release review.</ListItem>
    </List>
  `),
};

export const Markerless: Story = {
  render: renderStory(`
    <List marker="none" :class="demoRootClass">
      <ListItem>Semantics stay intact without visible markers.</ListItem>
      <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
      <ListItem>Spacing and text tokens still come from the root.</ListItem>
    </List>
  `),
};

export const Row: Story = {
  render: renderStory(`
    <List marker="none" :class="rowListClass">
      <ListItem>Semantic HTML</ListItem>
      <ListItem>Responsive spacing</ListItem>
      <ListItem>Composable styling</ListItem>
    </List>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <List size="xs">
        <ListItem>Compact supporting content.</ListItem>
        <ListItem>Still uses native list semantics and markers.</ListItem>
      </List>
      <List size="md">
        <ListItem>Default body content for a release summary.</ListItem>
        <ListItem>Items can wrap across multiple lines without losing their marker alignment.</ListItem>
      </List>
      <List size="xl">
        <ListItem>Large, high-emphasis content.</ListItem>
        <ListItem>Use this scale sparingly for short, scannable statements.</ListItem>
      </List>
    </div>
  `),
};

export const Tones: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <List tone="muted">
        <ListItem>Muted list tone</ListItem>
      </List>
      <List tone="subtle">
        <ListItem>Subtle list tone</ListItem>
      </List>
      <List tone="primary">
        <ListItem>Primary list tone</ListItem>
      </List>
      <List tone="destructive">
        <ListItem>Destructive list tone</ListItem>
      </List>
    </div>
  `),
};

export const NativeItems: Story = {
  name: 'Native Items',
  render: renderStory(`
    <List :class="demoRootClass">
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for ListItem when you want the stable item slot.</li>
    </List>
  `),
};

export const CustomItemComposition: Story = {
  name: 'Advanced Customization',
  render: renderStory(`
    <List :class="accentListClass">
      <ListItem as-child><AccentListItem>Native markers stay available for per-item styling.</AccentListItem></ListItem>
      <ListItem as-child><AccentListItem>Root utilities still control spacing and indentation.</AccentListItem></ListItem>
      <ListItem as-child><AccentListItem>asChild keeps the semantic li contract for a custom item.</AccentListItem></ListItem>
    </List>
  `),
};

export const CustomRootComposition: Story = {
  name: 'Custom Root Composition',
  render: renderStory(`
    <List as-child>
      <ReleaseList :class="demoRootClass">
        <ListItem>Prepare the release notes.</ListItem>
        <ListItem>Publish the package.</ListItem>
        <ListItem>Announce the release.</ListItem>
      </ReleaseList>
    </List>
  `),
};