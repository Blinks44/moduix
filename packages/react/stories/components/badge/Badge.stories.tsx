import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { Badge } from '../../../src/components/badge/Badge';
import styles from './Badge.stories.module.css';

const meta = {
  title: 'Components/Badge',
  component: Badge.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
] satisfies NonNullable<ComponentProps<typeof Badge>['variant']>[];

export const Basic: Story = {
  args: {
    children: 'New',
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        {variants.map((variant) => (
          <Badge.Root key={variant} variant={variant}>
            {variant}
          </Badge.Root>
        ))}
      </div>
    );
  },
};

export const WithDot: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge.Root variant="default">
          <Badge.Dot />
          Online
        </Badge.Root>
        <Badge.Root variant="secondary">
          <Badge.Dot />
          Draft
        </Badge.Root>
        <Badge.Root variant="destructive">
          <Badge.Dot />
          Failed
        </Badge.Root>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge.Root variant="default">
          Release
          <ChevronRightIcon />
        </Badge.Root>
        <Badge.Root variant="secondary">
          Details
          <ChevronRightIcon />
        </Badge.Root>
        <Badge.Root variant="outline">
          Read more
          <ChevronRightIcon />
        </Badge.Root>
        <Badge.Root asChild variant="link">
          <a href="#badge-link-story">
            Styling guide
            <ChevronRightIcon />
          </a>
        </Badge.Root>
      </div>
    );
  },
};

export const Link: Story = {
  render: () => {
    return (
      <Badge.Root asChild variant="link">
        <a href="#badge-link-story">Open badge composition guidance</a>
      </Badge.Root>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Badge.Root
        className={styles.constrained}
        title="Ready for stakeholder review after legal approval"
      >
        Ready for stakeholder review after legal approval
      </Badge.Root>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge.Root className={styles.small}>Small</Badge.Root>
        <Badge.Root>Default</Badge.Root>
        <Badge.Root className={styles.large}>Large</Badge.Root>
        <Badge.Root className={styles.customBadge}>
          <Badge.Dot />
          Priority
        </Badge.Root>
      </div>
    );
  },
};