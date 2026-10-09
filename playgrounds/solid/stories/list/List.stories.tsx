import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { List, ListItem } from '@/components/list/List';
import storyStyles from './List.stories.module.css';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with CSS variables or native ::marker selectors.',
];

function AccentListItem(props: JSX.LiHTMLAttributes<HTMLLIElement>) {
  const [local, others] = splitProps(props, ['class']);

  return <li {...others} class={clsx(storyStyles.accentItem, local.class)} />;
}

function ReleaseList(props: JSX.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} />;
}

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    gap: 'sm',
    size: 'md',
    tone: 'default',
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <List class={storyStyles.list} {...args}>
      {defaultItems.map((item) => (
        <ListItem>{item}</ListItem>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" start={3} class={storyStyles.list}>
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  ),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: () => (
    <List as="ol" type="A" class={storyStyles.list}>
      <ListItem>Draft the rollout checklist.</ListItem>
      <ListItem>Coordinate the release window.</ListItem>
      <ListItem>Confirm the post-release review.</ListItem>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" class={storyStyles.list}>
      <ListItem>Semantics stay intact without visible markers.</ListItem>
      <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
      <ListItem>Spacing and text tokens still come from the root.</ListItem>
    </List>
  ),
};

export const Row: Story = {
  render: () => (
    <List marker="none" class={storyStyles.rowList}>
      <ListItem>Semantic HTML</ListItem>
      <ListItem>Responsive spacing</ListItem>
      <ListItem>Composable styling</ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      <List size="xs">
        <ListItem>Compact supporting content.</ListItem>
        <ListItem>Still uses native list semantics and markers.</ListItem>
      </List>
      <List size="md">
        <ListItem>Default body content for a release summary.</ListItem>
        <ListItem>
          Items can wrap across multiple lines without losing their marker alignment.
        </ListItem>
      </List>
      <List size="xl">
        <ListItem>Large, high-emphasis content.</ListItem>
        <ListItem>Use this scale sparingly for short, scannable statements.</ListItem>
      </List>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div class={storyStyles.stack}>
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
  ),
};

export const NativeItems: Story = {
  name: 'Native Items',
  render: () => (
    <List class={storyStyles.list}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for ListItem when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomItemComposition: Story = {
  name: 'Advanced Customization',
  render: () => (
    <List class={storyStyles.accentList}>
      <ListItem
        asChild={(props) => (
          <AccentListItem {...props()}>
            Native markers stay available for per-item styling.
          </AccentListItem>
        )}
      />
      <ListItem
        asChild={(props) => (
          <AccentListItem {...props()}>
            Root CSS variables still control spacing and indentation.
          </AccentListItem>
        )}
      />
      <ListItem
        asChild={(props) => (
          <AccentListItem {...props()}>
            asChild keeps the semantic li contract for a custom item.
          </AccentListItem>
        )}
      />
    </List>
  ),
};

export const CustomRootComposition: Story = {
  name: 'Custom Root Composition',
  render: () => (
    <List
      asChild={(props) => {
        const rootProps = props();

        return (
          <ReleaseList {...rootProps} class={clsx(rootProps.class, storyStyles.list)}>
            <ListItem>Prepare the release notes.</ListItem>
            <ListItem>Publish the package.</ListItem>
            <ListItem>Announce the release.</ListItem>
          </ReleaseList>
        );
      }}
    />
  ),
};