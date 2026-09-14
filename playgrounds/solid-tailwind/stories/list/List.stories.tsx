import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { List } from '@/components/list/List';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with Tailwind utilities or native ::marker selectors.',
];

const listClass = 'w-full max-w-lg';
const rowListClass = clsx(listClass, 'flex-row flex-wrap');
const stackClass = 'flex w-full max-w-lg flex-col gap-6';
const accentListClass = clsx(listClass, 'ps-6');

function AccentListItem(props: JSX.LiHTMLAttributes<HTMLLIElement>) {
  const [local, others] = splitProps(props, ['class']);

  return <li {...others} class={clsx('marker:font-semibold marker:text-primary', local.class)} />;
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
    <List class={listClass} {...args}>
      {defaultItems.map((item) => (
        <List.Item>{item}</List.Item>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" start={3} class={listClass}>
      <List.Item>Prepare the release notes.</List.Item>
      <List.Item>Publish the package.</List.Item>
      <List.Item>Announce the release.</List.Item>
    </List>
  ),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: () => (
    <List as="ol" type="A" class={listClass}>
      <List.Item>Draft the rollout checklist.</List.Item>
      <List.Item>Coordinate the release window.</List.Item>
      <List.Item>Confirm the post-release review.</List.Item>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" class={listClass}>
      <List.Item>Semantics stay intact without visible markers.</List.Item>
      <List.Item>Useful for grouped metadata or key-value blocks.</List.Item>
      <List.Item>Spacing and text tokens still come from the root.</List.Item>
    </List>
  ),
};

export const Row: Story = {
  render: () => (
    <List marker="none" class={rowListClass}>
      <List.Item>Semantic HTML</List.Item>
      <List.Item>Responsive spacing</List.Item>
      <List.Item>Composable styling</List.Item>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={stackClass}>
      <List size="xs">
        <List.Item>Compact supporting content.</List.Item>
        <List.Item>Still uses native list semantics and markers.</List.Item>
      </List>
      <List size="md">
        <List.Item>Default body content for a release summary.</List.Item>
        <List.Item>
          Items can wrap across multiple lines without losing their marker alignment.
        </List.Item>
      </List>
      <List size="xl">
        <List.Item>Large, high-emphasis content.</List.Item>
        <List.Item>Use this scale sparingly for short, scannable statements.</List.Item>
      </List>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div class={stackClass}>
      <List tone="muted">
        <List.Item>Muted list tone</List.Item>
      </List>
      <List tone="subtle">
        <List.Item>Subtle list tone</List.Item>
      </List>
      <List tone="primary">
        <List.Item>Primary list tone</List.Item>
      </List>
      <List tone="destructive">
        <List.Item>Destructive list tone</List.Item>
      </List>
    </div>
  ),
};

export const NativeItems: Story = {
  name: 'Native Items',
  render: () => (
    <List class={listClass}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for List.Item when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomItemComposition: Story = {
  name: 'Advanced Customization',
  render: () => (
    <List class={accentListClass}>
      <List.Item
        asChild={(props) => (
          <AccentListItem {...props()}>
            Native markers stay available for per-item styling.
          </AccentListItem>
        )}
      />
      <List.Item
        asChild={(props) => (
          <AccentListItem {...props()}>
            Root utilities still control spacing and indentation.
          </AccentListItem>
        )}
      />
      <List.Item
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
          <ReleaseList {...rootProps} class={clsx(rootProps.class, listClass)}>
            <List.Item>Prepare the release notes.</List.Item>
            <List.Item>Publish the package.</List.Item>
            <List.Item>Announce the release.</List.Item>
          </ReleaseList>
        );
      }}
    />
  ),
};