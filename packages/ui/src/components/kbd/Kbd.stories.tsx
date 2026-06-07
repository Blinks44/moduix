import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from './Kbd';
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

export const ShortcutList: Story = {
  render: () => (
    <div className={styles.column}>
      <div className={styles.shortcutRow}>
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className={styles.shortcutRow}>
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div className={styles.shortcutRow}>
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div className={styles.row}>
      <Kbd className={styles.dense}>Esc</Kbd>
      <Kbd className={styles.dense}>Ctrl</Kbd>
      <Kbd className={styles.dense}>/</Kbd>
    </div>
  ),
};

export const CustomComposition: Story = {
  render: () => (
    <KbdGroup aria-label="Command K" className={styles.customGroup}>
      <Kbd className={styles.customKbd}>Cmd</Kbd>+<Kbd className={styles.customKbd}>K</Kbd>
    </KbdGroup>
  ),
};