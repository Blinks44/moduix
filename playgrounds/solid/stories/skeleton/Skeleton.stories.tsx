import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Skeleton } from '@/components/skeleton/Skeleton';
import styles from './Skeleton.stories.module.css';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => (
    <div class={styles.stack}>
      <Skeleton height={18} />
      <Skeleton width="86%" height={18} />
      <Skeleton width="64%" height={18} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div class={styles.card}>
      <Skeleton height={148} borderRadius="var(--moduix-radius-lg)" />
      <div class={styles.stack12}>
        <Skeleton width="70%" height={20} />
        <Skeleton height={14} />
        <Skeleton width="82%" height={14} />
      </div>
    </div>
  ),
};

export const MediaObject: Story = {
  render: () => (
    <div class={styles.mediaObject}>
      <Skeleton boxSize={48} borderRadius="var(--moduix-radius-full)" />
      <div class={styles.fill}>
        <div class={styles.stack8}>
          <Skeleton width="46%" height={16} />
          <Skeleton height={14} />
          <Skeleton width="72%" height={14} />
        </div>
      </div>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div class={styles.layoutExample}>
      <div class={styles.responsiveRow}>
        <Skeleton width={72} height={48} />
        <div class={styles.fill}>
          <div class={styles.stack8}>
            <Skeleton width="62%" height={14} />
            <Skeleton height={14} />
          </div>
        </div>
      </div>
      <div class={styles.responsiveRow}>
        <Skeleton width={72} height={48} />
        <div class={styles.fill}>
          <div class={styles.stack8}>
            <Skeleton width="48%" height={14} />
            <Skeleton height={14} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Static: Story = {
  render: () => <Skeleton width={320} height={72} variant="none" />,
};

export const Variants: Story = {
  render: () => (
    <div class={styles.variants}>
      <Skeleton height={18} variant="pulse" />
      <Skeleton height={18} variant="none" />
    </div>
  ),
};

export const LoadedContent: Story = {
  render: () => (
    <div class={styles.loadedContentStack}>
      <Skeleton loading class={styles.loadedContent}>
        <strong>Loaded content</strong>
        <span>Placeholder state</span>
      </Skeleton>
      <Skeleton loading={false} class={styles.loadedContent}>
        <strong>Loaded content</strong>
        <span>Content state</span>
      </Skeleton>
    </div>
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
    <div class={styles.customBlock}>
      <Skeleton class={styles.customSkeleton} height={18} />
      <Skeleton class={styles.customSkeleton} width="78%" height={18} />
      <Skeleton class={styles.customSkeleton} width="52%" height={18} />
    </div>
  ),
};