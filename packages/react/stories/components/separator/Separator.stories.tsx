import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../../../src/components/separator/Separator';
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

export const Default: Story = {
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
      <nav className={styles.nav} aria-label="Main navigation">
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
      </nav>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={styles.section}>
        <span className={styles.link}>Solid</span>
        <Separator />
        <span className={styles.link}>Dashed</span>
        <Separator variant="dashed" />
        <span className={styles.link}>Dotted</span>
        <Separator variant="dotted" />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.section}>
        <span className={styles.link}>Extra small</span>
        <Separator size="xs" />
        <span className={styles.link}>Small</span>
        <Separator size="sm" />
        <span className={styles.link}>Medium</span>
        <Separator size="md" />
        <span className={styles.link}>Large</span>
        <Separator size="lg" />
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <div className={styles.section}>
        <span className={styles.link}>Native host</span>
        <Separator asChild>
          <hr className={styles.nativeRule} />
        </Separator>
        <span className={styles.link}>Still styled by moduix hooks</span>
      </div>
    );
  },
};

export const Styling: Story = {
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