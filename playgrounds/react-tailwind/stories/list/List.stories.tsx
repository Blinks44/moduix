import type { Meta, StoryObj } from '@storybook/react-vite';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { List, ListItem } from '@/components/list/List';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with Tailwind utilities or native ::marker selectors.',
];

const listClassName = 'w-full max-w-lg';
const rowListClassName = clsx(listClassName, 'flex-row flex-wrap');
const stackClassName = 'flex w-full max-w-lg flex-col gap-6';
const accentListClassName = clsx(listClassName, 'ps-6');

const AccentListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(function AccentListItem(
  { className, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      {...props}
      className={clsx('marker:font-semibold marker:text-primary', className)}
    />
  );
});

const ReleaseList = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  function ReleaseList(props, ref) {
    return <ul ref={ref} {...props} />;
  },
);

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
    <List className={listClassName} {...args}>
      {defaultItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" start={3} className={listClassName}>
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  ),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: () => (
    <List as="ol" type="A" className={listClassName}>
      <ListItem>Draft the rollout checklist.</ListItem>
      <ListItem>Coordinate the release window.</ListItem>
      <ListItem>Confirm the post-release review.</ListItem>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" className={listClassName}>
      <ListItem>Semantics stay intact without visible markers.</ListItem>
      <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
      <ListItem>Spacing and text tokens still come from the root.</ListItem>
    </List>
  ),
};

export const Row: Story = {
  render: () => (
    <List marker="none" className={rowListClassName}>
      <ListItem>Semantic HTML</ListItem>
      <ListItem>Responsive spacing</ListItem>
      <ListItem>Composable styling</ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClassName}>
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
    <div className={stackClassName}>
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
    <List className={listClassName}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for ListItem when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomItemComposition: Story = {
  name: 'Advanced Customization',
  render: () => (
    <List className={accentListClassName}>
      <ListItem asChild>
        <AccentListItem>Native markers stay available for per-item styling.</AccentListItem>
      </ListItem>
      <ListItem asChild>
        <AccentListItem>Root utilities still control spacing and indentation.</AccentListItem>
      </ListItem>
      <ListItem asChild>
        <AccentListItem>asChild keeps the semantic li contract for a custom item.</AccentListItem>
      </ListItem>
    </List>
  ),
};

export const CustomRootComposition: Story = {
  name: 'Custom Root Composition',
  render: () => (
    <List asChild>
      <ReleaseList className={listClassName}>
        <ListItem>Prepare the release notes.</ListItem>
        <ListItem>Publish the package.</ListItem>
        <ListItem>Announce the release.</ListItem>
      </ReleaseList>
    </List>
  ),
};
