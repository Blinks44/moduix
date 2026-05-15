import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './List';
import storyStyles from './List.stories.module.css';

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <List className={storyStyles.list}>
      <ListItem>Use native list semantics.</ListItem>
      <ListItem>Keep spacing and typography on the design system scale.</ListItem>
      <ListItem>Customize markers with CSS variables.</ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List as="ol" className={storyStyles.list}>
      <ListItem>Install the package.</ListItem>
      <ListItem>Import the library stylesheet.</ListItem>
      <ListItem>Use components in your app.</ListItem>
    </List>
  ),
};

export const Markerless: Story = {
  render: () => (
    <List marker="none" className={storyStyles.list}>
      <ListItem>Markerless item</ListItem>
      <ListItem>Another markerless item</ListItem>
      <ListItem>Useful for compact metadata groups</ListItem>
    </List>
  ),
};

export const NativeItems: Story = {
  name: 'Native Items',
  render: () => (
    <List marker="bullet" className={storyStyles.customBullet}>
      <li>Use native li elements when a wrapper component is unnecessary.</li>
      <li>The root still controls spacing, marker style, size, and tone.</li>
      <li>Reach for ListItem when you want the stable item slot.</li>
    </List>
  ),
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: () => (
    <List marker="bullet" className={storyStyles.customBullet}>
      <ListItem>Bullet size is independent from text size.</ListItem>
      <ListItem>Bullet color and gap are controlled by CSS variables.</ListItem>
      <ListItem>Text color remains unchanged.</ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <List size="xl">
        <ListItem>Extra-large list item</ListItem>
      </List>
      <List size="md">
        <ListItem>Medium list item</ListItem>
      </List>
      <List size="xs">
        <ListItem>Extra-small list item</ListItem>
      </List>
    </div>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <List gap="xs">
        <ListItem>Extra-small gap</ListItem>
        <ListItem>Second item</ListItem>
      </List>
      <List gap="lg">
        <ListItem>Large gap</ListItem>
        <ListItem>Second item</ListItem>
      </List>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <List tone="muted">
        <ListItem>Muted list</ListItem>
      </List>
      <List tone="primary">
        <ListItem>Primary list</ListItem>
      </List>
      <List tone="destructive">
        <ListItem>Destructive list</ListItem>
      </List>
    </div>
  ),
};