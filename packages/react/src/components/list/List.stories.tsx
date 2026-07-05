import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';
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
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" start={3} className={storyStyles.list}>
      <List.Item>Prepare the release notes.</List.Item>
      <List.Item>Publish the package.</List.Item>
      <List.Item>Announce the release.</List.Item>
    </List>
  ),
};

export const OrderedType: Story = {
  name: 'Ordered Type',
  render: () => (
    <List as="ol" type="A" className={storyStyles.list}>
      <List.Item>Draft the rollout checklist.</List.Item>
      <List.Item>Coordinate the release window.</List.Item>
      <List.Item>Confirm the post-release review.</List.Item>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" className={storyStyles.list}>
      <List.Item>Semantics stay intact without visible markers.</List.Item>
      <List.Item>Useful for grouped metadata or key-value blocks.</List.Item>
      <List.Item>Spacing and text tokens still come from the root.</List.Item>
    </List>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <List tone="muted">
        <List.Item>Muted list tone</List.Item>
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
    <List className={storyStyles.list}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for List.Item when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomItemComposition: Story = {
  name: 'Custom Item Composition',
  render: () => (
    <List className={storyStyles.accentList}>
      <List.Item asChild>
        <li className={storyStyles.accentItem}>
          Native markers stay available for per-item styling.
        </li>
      </List.Item>
      <List.Item asChild>
        <li className={storyStyles.accentItem}>
          Root CSS variables still control spacing and indentation.
        </li>
      </List.Item>
      <List.Item asChild>
        <li className={storyStyles.accentItem}>
          asChild keeps the slot contract while handing markup to the caller.
        </li>
      </List.Item>
    </List>
  ),
};