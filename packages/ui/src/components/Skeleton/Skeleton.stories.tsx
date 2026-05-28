import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack';
import { Skeleton } from './Skeleton';
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
  render: () => {
    return (
      <Stack gap={10} className={styles.stack}>
        <Skeleton height={18} />
        <Skeleton width="86%" height={18} />
        <Skeleton width="64%" height={18} />
      </Stack>
    );
  },
};

export const Card: Story = {
  render: () => {
    return (
      <Stack gap={16} className={styles.card}>
        <Skeleton height={148} radius="var(--radius-lg)" />
        <Stack gap={12}>
          <Skeleton width="70%" height={20} />
          <Skeleton height={14} />
          <Skeleton width="82%" height={14} />
        </Stack>
      </Stack>
    );
  },
};

export const MediaObject: Story = {
  render: () => {
    return (
      <Stack direction="row" align="center" gap={12} className={styles.mediaObject}>
        <Skeleton size={48} shape="circle" />
        <Stack gap={8} fill>
          <Skeleton width="46%" height={16} />
          <Skeleton height={14} />
          <Skeleton width="72%" height={14} />
        </Stack>
      </Stack>
    );
  },
};

export const Composition: Story = {
  render: () => {
    return (
      <Stack gap={12} className={styles.layoutExample}>
        <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
          <Skeleton width={72} height={48} />
          <Stack gap={8} fill>
            <Skeleton width="62%" height={14} />
            <Skeleton height={14} />
          </Stack>
        </Stack>
        <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
          <Skeleton width={72} height={48} />
          <Stack gap={8} fill>
            <Skeleton width="48%" height={14} />
            <Skeleton height={14} />
          </Stack>
        </Stack>
      </Stack>
    );
  },
};

export const Static: Story = {
  render: () => {
    return <Skeleton width={320} height={72} animated={false} />;
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Stack gap={10} className={styles.customBlock}>
        <Skeleton className={styles.customSkeleton} height={18} />
        <Skeleton className={styles.customSkeleton} width="78%" height={18} />
        <Skeleton className={styles.customSkeleton} width="52%" height={18} />
      </Stack>
    );
  },
};