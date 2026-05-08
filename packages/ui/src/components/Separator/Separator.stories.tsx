import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';
import styles from './Separator.stories.module.css';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => {
    return (
      <div className={styles.card}>
        <div className={styles.stack}>
          <span className={styles.link}>Account settings</span>
          <Separator />
          <span className={styles.link}>Billing details</span>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className={styles.nav}>
        <a href="#" className={styles.link}>
          Home
        </a>
        <a href="#" className={styles.link}>
          Pricing
        </a>
        <Separator orientation="vertical" />
        <a href="#" className={styles.link}>
          Sign in
        </a>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.section}>
        <span className={styles.link}>Completed profile</span>
        <Separator className={styles.customSeparator} />
        <span className={styles.link}>Next step: billing details</span>
      </div>
    );
  },
};