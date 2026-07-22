import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '../../../src/components/kbd/Kbd';
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
    <Kbd.Group aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>
  ),
};

export const SingleKey: Story = {};

export const RootPart: Story = {
  render: () => <Kbd.Root>Enter</Kbd.Root>,
};

export const AsChild: Story = {
  render: () => (
    <Kbd asChild>
      <kbd title="Escape">Esc</kbd>
    </Kbd>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div className={styles.column}>
      <div className={styles.shortcutRow}>
        <Kbd.Group aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </Kbd.Group>
        Open command menu
      </div>
      <div className={styles.shortcutRow}>
        <Kbd.Group aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </Kbd.Group>
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

export const CustomStyling: Story = {
  render: () => (
    <Kbd.Group aria-label="Command K" className={styles.customGroup}>
      <Kbd className={styles.customKbd}>Cmd</Kbd>+<Kbd className={styles.customKbd}>K</Kbd>
    </Kbd.Group>
  ),
};