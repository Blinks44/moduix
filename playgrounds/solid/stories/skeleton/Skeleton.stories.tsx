import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack/Stack';
import styles from './Skeleton.stories.module.css';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => (
    <Stack gap={10} class={styles.stack}>
      <Skeleton height={18} />
      <Skeleton width="86%" height={18} />
      <Skeleton width="64%" height={18} />
    </Stack>
  ),
};

export const Card: Story = {
  render: () => (
    <Stack gap={16} class={styles.card}>
      <Skeleton height={148} borderRadius="var(--moduix-radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="70%" height={20} />
        <Skeleton height={14} />
        <Skeleton width="82%" height={14} />
      </Stack>
    </Stack>
  ),
};

export const MediaObject: Story = {
  render: () => (
    <Stack direction="row" align="center" gap={12} class={styles.mediaObject}>
      <Skeleton boxSize={48} borderRadius="var(--moduix-radius-full)" />
      <Stack direction="column" gap={8} fill>
        <Skeleton width="46%" height={16} />
        <Skeleton height={14} />
        <Skeleton width="72%" height={14} />
      </Stack>
    </Stack>
  ),
};

export const Composition: Story = {
  render: () => (
    <Stack gap={12} class={styles.layoutExample}>
      <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
        <Skeleton width={72} height={48} />
        <Stack direction="column" gap={8} fill>
          <Skeleton width="62%" height={14} />
          <Skeleton height={14} />
        </Stack>
      </Stack>
      <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
        <Skeleton width={72} height={48} />
        <Stack direction="column" gap={8} fill>
          <Skeleton width="48%" height={14} />
          <Skeleton height={14} />
        </Stack>
      </Stack>
    </Stack>
  ),
};

export const Static: Story = {
  render: () => <Skeleton width={320} height={72} variant="none" />,
};

export const Variants: Story = {
  render: () => (
    <Stack gap={12} class={styles.stack}>
      <Skeleton height={18} variant="pulse" />
      <Skeleton height={18} variant="none" />
    </Stack>
  ),
};

export const LoadedContent: Story = {
  render: () => (
    <Stack gap={12}>
      <Skeleton loading class={styles.loadedContent}>
        <strong>Loaded content</strong>
        <span>Placeholder state</span>
      </Skeleton>
      <Skeleton loading={false} class={styles.loadedContent}>
        <strong>Loaded content</strong>
        <span>Content state</span>
      </Skeleton>
    </Stack>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Skeleton
      asChild={(props) => <section {...props()} aria-label="Loading summary" />}
      height={72}
      borderRadius="var(--moduix-radius-lg)"
      class={styles.asChild}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Stack gap={10} class={styles.customBlock}>
      <Skeleton class={styles.customSkeleton} height={18} />
      <Skeleton class={styles.customSkeleton} width="78%" height={18} />
      <Skeleton class={styles.customSkeleton} width="52%" height={18} />
    </Stack>
  ),
};
