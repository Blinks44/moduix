import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonCircle, SkeletonColumn, SkeletonRect, SkeletonRow } from './Skeleton';
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
      <SkeletonColumn className={styles.textBlock} gap={10}>
        <Skeleton height={18} />
        <Skeleton height={18} width="86%" />
        <Skeleton height={18} width="64%" />
      </SkeletonColumn>
    );
  },
};

export const Card: Story = {
  render: () => {
    return (
      <div className={styles.card}>
        <SkeletonRect height={148} radius="var(--radius-lg)" />
        <SkeletonColumn gap={12}>
          <Skeleton height={20} width="70%" />
          <Skeleton height={14} />
          <Skeleton height={14} width="82%" />
        </SkeletonColumn>
      </div>
    );
  },
};

export const MediaObject: Story = {
  render: () => {
    return (
      <SkeletonRow className={styles.mediaObject} gap={12}>
        <SkeletonCircle size={48} />
        <SkeletonColumn grow gap={8}>
          <Skeleton height={16} width="46%" />
          <Skeleton height={14} />
          <Skeleton height={14} width="72%" />
        </SkeletonColumn>
      </SkeletonRow>
    );
  },
};

export const LayoutProps: Story = {
  render: () => {
    return (
      <SkeletonColumn className={styles.layoutProps} gap={12} pt={4} pb={4}>
        <SkeletonRow gap={12} mobileStack={false}>
          <Skeleton width={72} height={48} />
          <SkeletonColumn grow gap={8}>
            <Skeleton height={14} width="62%" />
            <Skeleton height={14} />
          </SkeletonColumn>
        </SkeletonRow>
        <SkeletonRow gap={12} mobileStack={false}>
          <Skeleton width={72} height={48} />
          <SkeletonColumn grow gap={8}>
            <Skeleton height={14} width="48%" />
            <Skeleton height={14} />
          </SkeletonColumn>
        </SkeletonRow>
      </SkeletonColumn>
    );
  },
};

export const Static: Story = {
  render: () => {
    return <SkeletonRect width={320} height={72} animated={false} />;
  },
};