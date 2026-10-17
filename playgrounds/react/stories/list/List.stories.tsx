import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { List, ListIndicator, ListItem } from '@/components/list/List';
import storyStyles from './List.stories.module.css';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with native ::marker selectors.',
];

const AccentListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(function AccentListItem(
  { className, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      {...props}
      className={className ? `${storyStyles.accentItem} ${className}` : storyStyles.accentItem}
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
    <List className={storyStyles.list} {...args}>
      {defaultItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" start={3} className={storyStyles.list}>
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" className={storyStyles.list}>
      <ListItem>Semantics stay intact without visible markers.</ListItem>
      <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
      <ListItem>Spacing and text tokens still come from the root.</ListItem>
    </List>
  ),
};

export const Row: Story = {
  render: () => (
    <List marker="none" className={storyStyles.rowList}>
      <ListItem>Semantic HTML</ListItem>
      <ListItem>Responsive spacing</ListItem>
      <ListItem>Composable styling</ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
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
    <div className={storyStyles.stack}>
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
    <List className={storyStyles.list}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for ListItem when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomItemComposition: Story = {
  name: 'Advanced Customization',
  render: () => (
    <List className={storyStyles.accentList}>
      <ListItem asChild>
        <AccentListItem>Native markers stay available for per-item styling.</AccentListItem>
      </ListItem>
      <ListItem asChild>
        <AccentListItem>A class on the root still controls the indentation.</AccentListItem>
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
      <ReleaseList className={storyStyles.list}>
        <ListItem>Prepare the release notes.</ListItem>
        <ListItem>Publish the package.</ListItem>
        <ListItem>Announce the release.</ListItem>
      </ReleaseList>
    </List>
  ),
};

export const Nested: Story = {
  render: () => (
    <List className={storyStyles.list}>
      <ListItem>
        Prepare the release
        <List as="ol">
          <ListItem>Update the changelog.</ListItem>
          <ListItem>Bump the package versions.</ListItem>
        </List>
      </ListItem>
      <ListItem>Publish the packages.</ListItem>
    </List>
  ),
};

export const WithIndicator: Story = {
  name: 'With Indicator',
  render: () => (
    <List marker="none" className={storyStyles.list}>
      <ListItem>
        <ListIndicator>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </ListIndicator>
        Tests pass in every adapter.
      </ListItem>
      <ListItem>
        <ListIndicator>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </ListIndicator>
        Long items wrap next to the indicator instead of under it, so the text stays aligned.
      </ListItem>
    </List>
  ),
};