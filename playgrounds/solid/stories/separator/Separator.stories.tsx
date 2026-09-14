import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Separator } from '@/components/separator/Separator';
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
  render: () => (
    <div class={styles.card}>
      <div class={styles.stack}>
        <span class={styles.link}>Account settings</span>
        <Separator />
        <span class={styles.link}>Billing details</span>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <nav class={styles.nav} aria-label="Main navigation">
      <a href="#" class={styles.link}>
        Home
      </a>
      <a href="#" class={styles.link}>
        Pricing
      </a>
      <Separator orientation="vertical" />
      <a href="#" class={styles.link}>
        Sign in
      </a>
    </nav>
  ),
};

export const Variants: Story = {
  render: () => (
    <div class={styles.section}>
      <span class={styles.link}>Solid</span>
      <Separator />
      <span class={styles.link}>Dashed</span>
      <Separator variant="dashed" />
      <span class={styles.link}>Dotted</span>
      <Separator variant="dotted" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.section}>
      <span class={styles.link}>Extra small</span>
      <Separator size="xs" />
      <span class={styles.link}>Small</span>
      <Separator size="sm" />
      <span class={styles.link}>Medium</span>
      <Separator size="md" />
      <span class={styles.link}>Large</span>
      <Separator size="lg" />
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div class={styles.section}>
      <span class={styles.link}>Related visual content</span>
      <Separator role="presentation" />
      <span class={styles.link}>Hidden from the accessibility tree</span>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div class={styles.section}>
      <span class={styles.link}>Native host</span>
      <Separator asChild={(props) => <hr {...props()} />} />
      <span class={styles.link}>Still styled by moduix hooks</span>
    </div>
  ),
};

export const Styling: Story = {
  render: () => (
    <div class={styles.section}>
      <span class={styles.link}>Completed profile</span>
      <Separator class={styles.customSeparator} />
      <span class={styles.link}>Next step: billing details</span>
    </div>
  ),
};