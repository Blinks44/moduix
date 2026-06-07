import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowUpRightIcon, StarIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Spinner } from '../spinner';
import { Button } from './Button';
import styles from './Button.stories.module.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={styles.row}>
      <Button disabled>Disabled</Button>
      <Button disabled focusableWhenDisabled variant="outline">
        Focusable disabled
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className={styles.row}>
      <Button>
        <PlusIcon />
        Create Item
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Small favorite">
        <StarIcon />
      </Button>
      <Button size="icon-md" variant="outline" aria-label="Favorite">
        <StarIcon />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Large favorite">
        <StarIcon />
      </Button>
      <Button variant="link">
        Open Docs
        <ArrowUpRightIcon />
      </Button>
    </div>
  ),
};

export const RenderedLink: Story = {
  render: () => (
    <Button render={<a href="#button" />} nativeButton={false} variant="outline">
      Open Button Docs
    </Button>
  ),
};

export const PendingState: Story = {
  render: () => {
    const [pending, setPending] = useState(false);

    return (
      <Button
        disabled={pending}
        focusableWhenDisabled
        aria-busy={pending || undefined}
        onClick={() => {
          setPending(true);
          setTimeout(() => setPending(false), 1800);
        }}
      >
        {pending ? (
          <>
            <Spinner decorative size="sm" />
            Saving
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    );
  },
};