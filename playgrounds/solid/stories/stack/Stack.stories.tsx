import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Separator as SeparatorComponent } from '@/components/separator';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack/Stack';
import { Text } from '@/components/text';
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
    <Stack gap={12} class={styles.panel}>
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
    <Stack direction="row" align="center" justify="space-between" gap={12} class={styles.row}>
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={8} wrap="wrap" class={styles.wrap}>
      <div class={styles.pill}>Design</div>
      <div class={styles.pill}>Engineering</div>
      <div class={styles.pill}>Docs</div>
      <div class={styles.pill}>Release</div>
    </Stack>
  ),
};

export const Separator: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={10} class={styles.row}>
      <Text weight="semibold">Design</Text>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <SeparatorComponent orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  ),
};

export const Fill: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={12} class={styles.row}>
      <Skeleton boxSize={40} borderRadius="var(--moduix-radius-full)" />
      <Stack gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} class={styles.row}>
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  ),
};

export const ReverseDirection: Story = {
  render: () => (
    <Stack direction="row-reverse" align="center" gap={12} class={styles.row}>
      <Text weight="semibold">Newest update</Text>
      <Text tone="muted">Appears first in the visual row.</Text>
    </Stack>
  ),
};

export const SkeletonComposition: Story = {
  render: () => (
    <Stack gap={16} class={styles.skeletonCard}>
      <Skeleton height={144} borderRadius="var(--moduix-radius-lg)" />
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
    <Stack
      asChild={(props) => <section {...props()} aria-label="Rendered as section" />}
      gap={12}
      class={styles.panel}
    >
      <Text weight="semibold">Rendered as section</Text>
      <Text tone="muted">
        Use asChild when the layout wrapper should also carry document semantics.
      </Text>
    </Stack>
  ),
};