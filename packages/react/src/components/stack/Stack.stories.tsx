import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator as SeparatorComponent } from '../separator';
import { Skeleton } from '../skeleton';
import { Text } from '../text';
import { Stack } from './Stack';
import styles from './Stack.stories.module.css';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Stack gap={12} className={styles.panel}>
      <Text weight="semibold">Project updates</Text>
      <Text tone="muted">
        Use Stack when layout intent is just flex direction, spacing, and alignment.
      </Text>
      <Text tone="muted">Keep more specific layout rules in local CSS.</Text>
    </Stack>
  ),
};

export const Row: Story = {
  render: () => (
    <Stack direction="row" align="center" justify="space-between" gap={12} className={styles.row}>
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={8} wrap="wrap" className={styles.wrap}>
      <div className={styles.pill}>Design</div>
      <div className={styles.pill}>Engineering</div>
      <div className={styles.pill}>Docs</div>
      <div className={styles.pill}>Release</div>
    </Stack>
  ),
};

export const Separator: Story = {
  render: () => (
    <Stack
      direction="row"
      align="center"
      gap={10}
      separator={<SeparatorComponent orientation="vertical" aria-hidden="true" />}
      className={styles.row}
    >
      <Text weight="semibold">Design</Text>
      <Text tone="muted">Engineering</Text>
      <Text tone="muted">Docs</Text>
    </Stack>
  ),
};

export const Fill: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={12} className={styles.row}>
      <Skeleton boxSize={40} borderRadius="var(--radius-full)" />
      <Stack gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} className={styles.row}>
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  ),
};

export const SkeletonComposition: Story = {
  render: () => (
    <Stack gap={16} className={styles.skeletonCard}>
      <Skeleton height={144} borderRadius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  ),
};

export const SemanticElement: Story = {
  render: () => (
    <Stack asChild gap={12} className={styles.panel}>
      <section>
        <Text weight="semibold">Rendered as section</Text>
        <Text tone="muted">
          Use asChild when the layout wrapper should also carry document semantics.
        </Text>
      </section>
    </Stack>
  ),
};