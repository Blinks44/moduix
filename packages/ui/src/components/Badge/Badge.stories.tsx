import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRightIcon } from '@/icons/ui';
import { Badge, BadgeDot } from './Badge';
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

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost'] as const;

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

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge className={styles.small}>Small</Badge>
        <Badge>Default</Badge>
        <Badge className={styles.large}>Large</Badge>
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
          Online
        </Badge>
        <Badge variant="secondary">
          <BadgeDot />
          Draft
        </Badge>
        <Badge variant="destructive">
          <BadgeDot />
          Failed
        </Badge>
      </div>
    );
  },
};

export const WithRightIcon: Story = {
  render: () => {
    return (
      <div className={styles.row}>
        <Badge variant="default">
          Release
          <ChevronRightIcon />
        </Badge>
        <Badge variant="secondary">
          Details
          <ChevronRightIcon />
        </Badge>
        <Badge variant="outline">
          Read more
          <ChevronRightIcon />
        </Badge>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Badge className={styles.customBadge}>
        <BadgeDot className={styles.customDot} />
        Priority
      </Badge>
    );
  },
};