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
    children: 'Cmd K',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'outline', 'ghost'] as const;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Kbd key={variant} variant={variant}>
          {variant}
        </Kbd>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Cmd K</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </div>
  ),
};

export const ShortcutGroup: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div className={styles.column}>
      <div className={styles.shortcutRow}>
        <KbdGroup>
          <Kbd>Cmd</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className={styles.shortcutRow}>
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <Kbd>?</Kbd>
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

export const CustomStyles: Story = {
  render: () => <Kbd className={styles.customKbd}>Cmd K</Kbd>,
};