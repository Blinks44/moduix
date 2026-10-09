import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { Badge, BadgeDot, BadgeLabel } from '@/components/badge/Badge';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './Badge.stories.module.css';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

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
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    );
  },
};

export const WithDot: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge variant="default">
          <BadgeDot />
          <BadgeLabel>Online</BadgeLabel>
        </Badge>
        <Badge variant="secondary">
          <BadgeDot />
          <BadgeLabel>Draft</BadgeLabel>
        </Badge>
        <Badge variant="destructive">
          <BadgeDot />
          <BadgeLabel>Failed</BadgeLabel>
        </Badge>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge variant="default">
          <BadgeLabel>Release</BadgeLabel>
          <ChevronRightIcon />
        </Badge>
        <Badge variant="secondary">
          <BadgeLabel>Details</BadgeLabel>
          <ChevronRightIcon />
        </Badge>
        <Badge variant="outline">
          <BadgeLabel>Read more</BadgeLabel>
          <ChevronRightIcon />
        </Badge>
        <Badge asChild variant="link">
          <a href="#badge-link-story">
            <BadgeLabel>Styling guide</BadgeLabel>
            <ChevronRightIcon />
          </a>
        </Badge>
      </div>
    );
  },
};

export const Link: Story = {
  render: () => {
    return (
      <Badge asChild variant="link">
        <a href="#badge-link-story">Open badge composition guidance</a>
      </Badge>
    );
  },
};

export const DisabledButton: Story = {
  render: () => {
    return (
      <Badge asChild variant="secondary">
        <button className={styles.disabledButton} disabled>
          Archived
        </button>
      </Badge>
    );
  },
};

export const TruncatedLabel: Story = {
  render: () => {
    return (
      <Badge
        className={styles.constrained}
        title="Ready for stakeholder review after legal approval"
      >
        <BadgeLabel>Ready for stakeholder review after legal approval</BadgeLabel>
      </Badge>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge className={styles.small}>Small</Badge>
        <Badge>Default</Badge>
        <Badge className={styles.large}>Large</Badge>
        <Badge className={styles.customBadge}>
          <BadgeDot />
          <BadgeLabel>Priority</BadgeLabel>
        </Badge>
      </div>
    );
  },
};