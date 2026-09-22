import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Kbd, KbdGroup } from '@/components/kbd/Kbd';
import styles from './Kbd.stories.module.css';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Esc',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const SingleKey: Story = {};

export const RootPart: Story = {
  render: () => <Kbd>Enter</Kbd>,
};

export const AsChild: Story = {
  render: () => <Kbd asChild={(props) => <kbd {...props()} title="Escape" />}>Esc</Kbd>,
};

export const GroupAsChild: Story = {
  render: () => (
    <KbdGroup asChild={(props) => <span {...props()} />} aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div class={styles.column}>
      <div class={styles.shortcutRow}>
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div class={styles.shortcutRow}>
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div class={styles.shortcutRow}>
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div class={styles.row}>
      <Kbd class={styles.dense}>Esc</Kbd>
      <Kbd class={styles.dense}>Ctrl</Kbd>
      <Kbd class={styles.dense}>/</Kbd>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <KbdGroup aria-label="Command K" class={styles.customGroup}>
      <Kbd class={styles.customKbd}>Cmd</Kbd>+<Kbd class={styles.customKbd}>K</Kbd>
    </KbdGroup>
  ),
};