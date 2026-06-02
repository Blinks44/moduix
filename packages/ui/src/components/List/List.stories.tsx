import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './List';
import storyStyles from './List.stories.module.css';

const defaultItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with CSS variables or native ::marker selectors.',
];

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

export const OrderedStart: Story = {
  name: 'Ordered Start',
  render: () => (
    <List as="ol" start={3} className={storyStyles.list}>
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </List>
  ),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: () => (
    <List as="ol" type="A" className={storyStyles.list}>
      <ListItem>Draft the rollout checklist.</ListItem>
      <ListItem>Coordinate the release window.</ListItem>
      <ListItem>Confirm the post-release review.</ListItem>
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

export const Tones: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <List tone="muted">
        <ListItem>Muted list tone</ListItem>
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

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: () => (
    <List className={storyStyles.accentList}>
      <ListItem className={storyStyles.accentItem}>
        Native markers stay available for per-item styling.
      </ListItem>
      <ListItem className={storyStyles.accentItem}>
        Root CSS variables still control spacing and indentation.
      </ListItem>
      <ListItem className={storyStyles.accentItem}>
        No extra marker/content API is required.
      </ListItem>
    </List>
  ),
};